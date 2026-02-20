import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, company, message } = body;

  // Validate required fields
  const errors: Record<string, string> = {};

  if (!name?.trim()) errors.name = "Name is required.";
  if (!email?.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format.";
  }
  if (!message?.trim()) errors.message = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // TODO: Integrate Firestore submission
  console.log("Contact form submission:", {
    name: name!.trim(),
    email: email!.trim(),
    company: company?.trim() || "",
    message: message!.trim(),
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
