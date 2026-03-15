"use client";

import { useEffect } from "react";
import { initErrorLogger } from "@/lib/error-logger";

export default function ErrorLogger() {
  useEffect(() => {
    initErrorLogger();
  }, []);

  return null;
}
