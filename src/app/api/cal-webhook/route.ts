import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { verifyWebhookSecret } from "@/lib/security";

// Cal.com webhook payload types
interface CalBookingPayload {
  triggerEvent: "BOOKING_CREATED" | "BOOKING_CANCELLED" | "BOOKING_RESCHEDULED";
  payload: {
    uid: string;
    title: string;
    startTime: string;
    endTime: string;
    status: string;
    attendees: Array<{
      email: string;
      name: string;
      timeZone: string;
    }>;
    organizer: {
      email: string;
      name: string;
      timeZone: string;
    };
    metadata?: Record<string, unknown>;
    responses?: {
      name?: { value: string };
      email?: { value: string };
      notes?: { value: string };
    };
  };
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimitResponse = rateLimit(req, RATE_LIMITS.webhook);
  if (rateLimitResponse) return rateLimitResponse;

  // Verify webhook secret header
  const headerSecret = req.headers.get("x-webhook-secret");
  const webhookSecret = process.env.CAL_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[Cal Webhook] CAL_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  if (!verifyWebhookSecret(headerSecret, webhookSecret)) {
    console.warn("[Cal Webhook] Invalid or missing secret");
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = (await req.json()) as CalBookingPayload;
    const { triggerEvent, payload } = body;

    // Get attendee info (the person who booked)
    const attendee = payload.attendees?.[0];
    
    if (!attendee) {
      return NextResponse.json({ error: "No attendee found" }, { status: 400 });
    }

    const bookingData = {
      // Booking details
      uid: payload.uid,
      event: triggerEvent,
      title: payload.title,
      status: payload.status,
      startTime: payload.startTime,
      endTime: payload.endTime,
      
      // Person who booked
      name: attendee.name,
      email: attendee.email,
      timeZone: attendee.timeZone,
      
      // Additional notes if provided
      notes: payload.responses?.notes?.value || null,
      
      // Metadata
      createdAt: new Date().toISOString(),
    };

    // Store in Firestore
    const bookingsCollection = db.collection("bookings");
    await bookingsCollection.add(bookingData);

    console.log(`[Cal Webhook] ${triggerEvent}: ${attendee.email}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Cal Webhook] Error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
