"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface QuizEmailCaptureProps {
  onSubmit: (data: { email: string; name?: string; company?: string }) => void;
  isSubmitting: boolean;
  error: string | null;
}

export default function QuizEmailCapture({
  onSubmit,
  isSubmitting,
  error,
}: QuizEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEmailError(null);

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required to see your results.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    onSubmit({
      email: email.trim(),
      name: name.trim() || undefined,
      company: company.trim() || undefined,
    });
  }

  const inputBase =
    "w-full rounded-lg border-2 bg-cream px-4 py-3 text-sm text-dark placeholder:text-dark/40 transition-colors focus:border-red focus:outline-none";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-md"
    >
      {/* Icon */}
      <motion.div variants={fadeUp} className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red/10">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C0392B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.div variants={fadeUp} className="mb-8 text-center">
        <h2 className="font-display font-extrabold tracking-[-0.02em] text-2xl text-dark md:text-3xl">
          Your results are ready
        </h2>
        <p className="mt-3 text-dark/65">
          Enter your email to see your personalized service recommendations.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form variants={fadeUp} onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {/* Email (Required) */}
          <div>
            <label
              htmlFor="quiz-email"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-dark/50"
            >
              Email <span className="text-error">*</span>
            </label>
            <input
              type="email"
              id="quiz-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              className={`${inputBase} ${
                emailError ? "border-error" : "border-shadow"
              }`}
              placeholder="you@company.com"
              aria-describedby={emailError ? "email-error" : undefined}
              aria-invalid={!!emailError}
              disabled={isSubmitting}
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-xs text-error" role="alert">
                {emailError}
              </p>
            )}
          </div>

          {/* Name (Optional) */}
          <div>
            <label
              htmlFor="quiz-name"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-dark/50"
            >
              Name <span className="text-dark/40">(optional)</span>
            </label>
            <input
              type="text"
              id="quiz-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputBase} border-shadow`}
              placeholder="Your name"
              disabled={isSubmitting}
            />
          </div>

          {/* Company (Optional) */}
          <div>
            <label
              htmlFor="quiz-company"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-dark/50"
            >
              Company <span className="text-dark/40">(optional)</span>
            </label>
            <input
              type="text"
              id="quiz-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`${inputBase} border-shadow`}
              placeholder="Your company"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn--primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Loading..." : "See My Results"}
          </button>

          {/* API Error */}
          {error && (
            <p className="text-center text-sm text-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </motion.form>

      {/* Privacy Note */}
      <motion.p
        variants={fadeUp}
        className="mt-6 text-center text-xs text-dark/50"
      >
        No spam, ever. Your info is used only to personalize your results.
      </motion.p>
    </motion.div>
  );
}
