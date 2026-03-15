import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";
import nodemailer from "nodemailer";
import type { QuizSubmission } from "@/types/quiz";
import { SERVICE_DISPLAY, AUDIENCE_DISPLAY } from "@/lib/quiz-data";

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || "465");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";

async function sendQuizNotification(data: QuizSubmission) {
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

  const primary = SERVICE_DISPLAY[data.recommendation.primaryService];
  const secondary = data.recommendation.secondaryService
    ? SERVICE_DISPLAY[data.recommendation.secondaryService]
    : null;
  const audience = AUDIENCE_DISPLAY[data.recommendation.audienceSegment];

  const urgencyLabels = {
    high: "ASAP",
    medium: "Next month or two",
    low: "Q2/Q3",
    exploring: "Just exploring",
  };

  await transporter.sendMail({
    from: `"Hone Studio" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `Quiz completed: ${data.name || data.email} → ${primary.title}`,
    text: [
      `New quiz submission from ${data.name || "Unknown"}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : null,
      ``,
      `=== RECOMMENDATION ===`,
      `Primary: ${primary.title}`,
      secondary ? `Secondary: ${secondary.title}` : null,
      `Audience: ${audience.title}`,
      `Urgency: ${urgencyLabels[data.urgency]}`,
      ``,
      `=== SCORES ===`,
      `Web: ${data.scores.web}`,
      `AI: ${data.scores.ai}`,
      `Strategy: ${data.scores.strategy}`,
      ``,
      `=== ANSWERS ===`,
      ...data.answers.map((a) => `Q: ${a.questionText}\nA: ${a.answerText}`),
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #0F1114; margin-bottom: 24px;">New Quiz Submission</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 8px 0; color: #5A6069; width: 100px;">Name</td><td style="padding: 8px 0;">${data.name || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #5A6069;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          ${data.company ? `<tr><td style="padding: 8px 0; color: #5A6069;">Company</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #5A6069;">Urgency</td><td style="padding: 8px 0;"><strong>${urgencyLabels[data.urgency]}</strong></td></tr>
        </table>
        
        <div style="background: #00D4AA15; border-left: 3px solid #00D4AA; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #00D4AA;">Primary Recommendation</p>
          <p style="margin: 0; font-size: 18px; font-weight: 600;">${primary.title}</p>
          ${secondary ? `<p style="margin: 8px 0 0; font-size: 14px; color: #5A6069;">Also: ${secondary.title}</p>` : ""}
        </div>
        
        <div style="background: #F6F7F9; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #5A6069;">Audience Segment</p>
          <p style="margin: 0; font-weight: 600;">${audience.title}</p>
          <p style="margin: 4px 0 0; font-size: 14px; color: #5A6069;">${audience.subtitle}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <p style="margin: 0 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #5A6069;">Scores</p>
          <div style="display: flex; gap: 16px;">
            <div style="text-align: center;">
              <p style="margin: 0; font-size: 24px; font-weight: 600; color: #00D4AA;">${data.scores.web}</p>
              <p style="margin: 0; font-size: 12px; color: #5A6069;">Web</p>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0; font-size: 24px; font-weight: 600; color: #FF6B3D;">${data.scores.ai}</p>
              <p style="margin: 0; font-size: 12px; color: #5A6069;">AI</p>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0; font-size: 24px; font-weight: 600; color: #4F5BD5;">${data.scores.strategy}</p>
              <p style="margin: 0; font-size: 12px; color: #5A6069;">Strategy</p>
            </div>
          </div>
        </div>
        
        <details style="margin-bottom: 16px;">
          <summary style="cursor: pointer; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #5A6069;">View All Answers</summary>
          <div style="margin-top: 12px;">
            ${data.answers
              .map(
                (a) => `
              <div style="padding: 12px 0; border-bottom: 1px solid #ECEEF1;">
                <p style="margin: 0 0 4px; font-size: 13px; color: #5A6069;">${a.questionText}</p>
                <p style="margin: 0; font-size: 14px;">${a.answerText}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </details>
        
        <p style="margin-top: 24px; font-size: 12px; color: #8A9099;">Submitted via honestudio.cv quiz</p>
      </div>
    `,
  });
}

export async function POST(request: NextRequest) {
  let body: QuizSubmission;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Validate required fields
  if (!body.email?.trim()) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  if (!body.answers?.length) {
    return NextResponse.json(
      { error: "No answers provided" },
      { status: 400 }
    );
  }

  const submission: QuizSubmission = {
    createdAt: new Date().toISOString(),
    scores: body.scores,
    recommendation: body.recommendation,
    answers: body.answers,
    email: body.email.trim(),
    name: body.name?.trim(),
    company: body.company?.trim(),
    urgency: body.urgency,
  };

  try {
    // Save to Firestore
    await db.collection("quiz_submissions").add(submission);

    // Send email notification
    await sendQuizNotification(submission);
  } catch (err) {
    console.error("Quiz submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
