"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "./ChatMessage";

interface Message {
  role: "user" | "model";
  text: string;
}

const QUICK_PROMPTS = [
  "What do you do?",
  "Show me your work",
  "How do I get in touch?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return;

      const userMsg: Message = { role: "user", text: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setStreaming(true);

      // Add placeholder for streaming response
      setMessages((prev) => [...prev, { role: "model", text: "" }]);

      try {
        const page = window.location.pathname.replace("/", "") || "home";
        const history = messages.map((m) => ({ role: m.role, text: m.text }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text.trim(), history, page }),
        });

        if (!res.ok || !res.body) throw new Error("Chat request failed");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });
          const current = accumulated;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "model", text: current };
            return updated;
          });
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "model",
            text: "Sorry, something went wrong. Try again or [get in touch directly](/contact).",
          };
          return updated;
        });
      } finally {
        setStreaming(false);
      }
    },
    [messages, streaming]
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open Honest AI chat"}
        aria-expanded={open}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal shadow-lg transition-transform hover:scale-105 hover:bg-teal-bright active:scale-95"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F1114"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </>
          )}
        </svg>
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="dialog"
            aria-label="Honest AI chat"
            className="fixed right-6 bottom-24 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-lg border border-cloud dark:border-slate bg-white dark:bg-ink shadow-2xl sm:w-96"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-cloud dark:border-slate px-4 py-3">
              <div className="h-2 w-2 rounded-full bg-teal animate-blink" />
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">Honest AI</p>
                <p className="text-[11px] text-graphite dark:text-ash">Ask me anything about Hone Studio</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-center text-xs text-ash dark:text-iron">Quick prompts</p>
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="block w-full rounded-md border border-cloud dark:border-slate px-3 py-2 text-left text-sm text-graphite dark:text-ash transition-colors hover:border-teal hover:text-teal"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} text={msg.text} />
              ))}

              {streaming && messages[messages.length - 1]?.text === "" && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-snow dark:bg-slate px-4 py-3">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-blink rounded-full bg-graphite dark:bg-ash" />
                      <span className="h-1.5 w-1.5 animate-blink rounded-full bg-graphite dark:bg-ash [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 animate-blink rounded-full bg-graphite dark:bg-ash [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-cloud dark:border-slate p-3">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  disabled={streaming}
                  aria-label="Chat message"
                  className="flex-1 resize-none rounded-md border border-cloud dark:border-slate bg-snow dark:bg-carbon px-3 py-2 text-sm text-ink dark:text-white placeholder:text-ash dark:placeholder:text-iron focus:border-teal focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-teal text-ink transition-colors hover:bg-teal-bright disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
