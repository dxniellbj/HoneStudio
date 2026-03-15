import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  type: "error" | "unhandledrejection";
}

export async function POST(request: NextRequest) {
  // Rate limit to prevent abuse
  const rateLimitResponse = rateLimit(request, RATE_LIMITS.contact);
  if (rateLimitResponse) return rateLimitResponse;

  let body: ErrorReport;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Basic validation
  if (!body.message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  try {
    await db.collection("errors").add({
      message: body.message?.slice(0, 1000) || "Unknown error",
      stack: body.stack?.slice(0, 5000) || null,
      url: body.url?.slice(0, 500) || null,
      userAgent: body.userAgent?.slice(0, 500) || null,
      timestamp: body.timestamp || new Date().toISOString(),
      type: body.type || "error",
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[Error Logger] Failed to save:", err);
    // Don't return error - just acknowledge
  }

  return NextResponse.json({ ok: true });
}
