import type { Metadata } from "next";
import Quiz from "@/components/quiz/Quiz";

export const metadata: Metadata = {
  title: "Find Your Service Fit | Hone Studio",
  description:
    "Take a 5-minute quiz to discover which Hone Studio services best match your business needs. Get personalized recommendations for web design, AI automation, or strategic research.",
  openGraph: {
    title: "Find Your Service Fit | Hone Studio",
    description:
      "Take a 5-minute quiz to discover which Hone Studio services best match your business needs.",
  },
};

export default function QuizPage() {
  return (
    <main className="min-h-dvh bg-ink">
      <Quiz />
    </main>
  );
}
