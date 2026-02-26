import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";
import nodemailer from "nodemailer";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || "465");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";

async function sendNotification(data: {
  name: string;
  email: string;
  company: string;
  message: string;
}) {
  if (!NOTIFY_EMAIL || !SMTP_USER || !SMTP_PASS) {
    console.warn("Email notification skipped — SMTP env vars not configured.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Hone Studio" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `New inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : null,
      ``,
      `Message:`,
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #0F1114; margin-bottom: 24px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #5A6069; width: 100px;">Name</td><td style="padding: 8px 0;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #5A6069;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          ${data.company ? `<tr><td style="padding: 8px 0; color: #5A6069;">Company</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ""}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #F6F7F9; border-radius: 6px;">
          <p style="margin: 0; color: #5A6069; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #8A9099;">Sent via honestudio.cv contact form</p>
      </div>
    `,
  });
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

  const submission = {
    name: name!.trim(),
    email: email!.trim(),
    company: company?.trim() || "",
    message: message!.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    // Save to Firestore
    await db.collection("contacts").add(submission);

    // Send email notification
    await sendNotification(submission);
  } catch (err) {
    console.error("Contact submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
