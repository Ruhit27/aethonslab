import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../constants";

/** Floating "Chat on WhatsApp" button, bottom-right on every screen size. */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Aethon Lab on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-[#073B1F] shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:-translate-y-0.5 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
