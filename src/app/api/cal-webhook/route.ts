import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";

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
