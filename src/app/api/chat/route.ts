import { NextRequest } from "next/server";
import { model, SYSTEM_PROMPT } from "@/lib/gemini-client";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { validateOrigin, sanitizeInput } from "@/lib/security";

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResponse = rateLimit(request, RATE_LIMITS.chat);
  if (rateLimitResponse) return rateLimitResponse;

  // Origin validation (CSRF protection)
  if (!validateOrigin(request)) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }

  let body: { message?: string; history?: { role: string; text: string }[]; page?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { message, history = [], page } = body;

  // Validate and sanitize message
  if (!message?.trim()) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  // Limit message length to prevent abuse
  const sanitizedMessage = sanitizeInput(message, 2000);
  if (sanitizedMessage.length === 0) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  // Limit history to prevent context stuffing
  const limitedHistory = history.slice(-20).map((msg) => ({
    role: msg.role as "user" | "model",
    parts: [{ text: sanitizeInput(msg.text, 2000) }],
  }));

  const pageContext = page ? `\nThe user is currently on the ${sanitizeInput(page, 50)} page.` : "";

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "System instructions: " + SYSTEM_PROMPT + pageContext }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I'm Honest AI, ready to help visitors learn about Hone Studio." }],
        },
        ...limitedHistory,
      ],
    });

    const result = await chat.sendMessageStream(sanitizedMessage);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Gemini stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
