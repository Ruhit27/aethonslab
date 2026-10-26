import type { Metadata } from "next";
import { WhatsAppDemo } from "@/components/demo/WhatsAppDemo";

export const metadata: Metadata = {
  title: "Lead Autopilot demo | Aethon Lab",
  description:
    "Chat with Lead Autopilot the way your customers would on WhatsApp.",
};

export default function DemoPage() {
  return <WhatsAppDemo />;
}
