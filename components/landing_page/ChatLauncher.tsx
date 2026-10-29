"use client";

import * as React from "react";
import { Bot, MessageCircle, X } from "lucide-react";
import { DemoChat } from "@/components/demo/WhatsAppDemo";
import { WHATSAPP_LINK } from "./content";

/**
 * Floating Aethon Lab button, bottom-right on every screen size. Opens the
 * Lead Autopilot live demo in a popup, with a link to continue on WhatsApp.
 */
export function ChatLauncher() {
  const [open, setOpen] = React.useState(false);
  // Mount the chat on first open, then keep it so the conversation survives
  // closing and reopening the popup.
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggle() {
    setMounted(true);
    setOpen((value) => !value);
  }

  return (
    <>
      {mounted && (
        <div
          id="aethon-chat"
          role="dialog"
          aria-label="Chat with Aethon Lab"
          className={
            "fixed bottom-24 right-4 z-50 w-[min(380px,calc(100vw-2rem))] origin-bottom-right transition-all duration-200 sm:bottom-28 sm:right-8 " +
            (open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0")
          }
          inert={!open}
        >
          <DemoChat
            className="h-[min(600px,calc(100dvh-8rem))]"
            headerAction={
              <>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Continue on WhatsApp"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/15 px-2.5 py-1.5 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/25"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </>
            }
          />
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="aethon-chat"
        aria-label={open ? "Close chat" : "Chat with Aethon Lab"}
        className="fixed bottom-5 right-4 z-50 inline-flex h-14 items-center gap-3 rounded-full border border-white/12 bg-surface-2 px-4 text-sm font-medium text-white shadow-[0_8px_30px_rgba(99,102,255,0.35)] transition-transform duration-200 hover:-translate-y-0.5 sm:bottom-8 sm:right-8"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <span className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
        <span className="hidden sm:inline">{open ? "Close" : "Chat with Aethon Lab"}</span>
      </button>
    </>
  );
}
