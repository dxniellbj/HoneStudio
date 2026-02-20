import { NextRequest } from "next/server";
import { model, SYSTEM_PROMPT } from "@/lib/gemini-client";

export async function POST(request: NextRequest) {
  let body: { message?: string; history?: { role: string; text: string }[]; page?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { message, history = [], page } = body;

  if (!message?.trim()) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  const pageContext = page ? `\nThe user is currently on the ${page} page.` : "";

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
        ...history.map((msg) => ({
          role: msg.role as "user" | "model",
          parts: [{ text: msg.text }],
        })),
      ],
    });

    const result = await chat.sendMessageStream(message);

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
