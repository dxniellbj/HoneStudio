import { NextRequest } from "next/server";
import crypto from "crypto";

/**
 * Validate request origin for CSRF protection
 * Returns true if the request origin is valid
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // Allow requests without origin (same-origin, non-browser)
  if (!origin) {
    return true;
  }

  // Parse origin to get hostname
  try {
    const originUrl = new URL(origin);
    const allowedHosts = [
      "localhost",
      "127.0.0.1",
      "honestudio.cv",
      "honestudio.co",
      "www.honestudio.cv",
      "www.honestudio.co",
      // Firebase hosting preview URLs
      "hone-studio.web.app",
      "hone-studio.firebaseapp.com",
    ];

    // Check if origin matches allowed hosts
    if (allowedHosts.some((h) => originUrl.hostname === h || originUrl.hostname.endsWith(`.${h}`))) {
      return true;
    }

    // Check if origin matches the host header
    if (host && originUrl.host === host) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Verify webhook secret header
 * Uses a simple shared secret in x-webhook-secret header
 */
export function verifyWebhookSecret(
  headerSecret: string | null,
  expectedSecret: string
): boolean {
  if (!headerSecret || !expectedSecret) {
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(headerSecret),
      Buffer.from(expectedSecret)
    );
  } catch {
    return false;
  }
}

/**
 * Sanitize string input - removes null bytes and trims
 */
export function sanitizeInput(input: string, maxLength = 10000): string {
  if (typeof input !== "string") {
    return "";
  }
  // Remove null bytes and trim
  return input.replace(/\0/g, "").trim().slice(0, maxLength);
}

/**
 * Validate and sanitize email
 */
export function sanitizeEmail(email: string): string | null {
  const sanitized = sanitizeInput(email, 254); // RFC 5321 max length
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized.toLowerCase() : null;
}
