/**
 * Client-side error logging to Firestore
 * Captures uncaught errors and sends them to /api/errors
 */

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  type: "error" | "unhandledrejection";
}

const ERROR_ENDPOINT = "/api/errors";

export function reportError(error: Error, type: ErrorReport["type"] = "error") {
  // Don't report in development
  if (process.env.NODE_ENV !== "production") {
    console.error("[Error Logger]", error);
    return;
  }

  const report: ErrorReport = {
    message: error.message || String(error),
    stack: error.stack,
    url: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    timestamp: new Date().toISOString(),
    type,
  };

  // Use sendBeacon for reliability (survives page unload)
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(ERROR_ENDPOINT, JSON.stringify(report));
  } else {
    // Fallback to fetch
    fetch(ERROR_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
      keepalive: true,
    }).catch(() => {
      // Silently fail - don't cause more errors
    });
  }
}

export function initErrorLogger() {
  if (typeof window === "undefined") return;

  // Catch uncaught errors
  window.addEventListener("error", (event) => {
    reportError(event.error || new Error(event.message));
  });

  // Catch unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    reportError(error, "unhandledrejection");
  });
}
