import { site, whatsappHref } from "@/config/site";
import { Magnetic } from "@/components/ui/Magnetic";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Magnetic radius={60} maxPull={8}>
        <a
          href={whatsappHref(`Hi ${site.fullName}, I'd like to begin a conversation about a project.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink shadow-[0_8px_24px_rgba(176,141,87,0.35)] transition-colors duration-300 hover:bg-brass-soft"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M8.5 9.5c0 3.5 2.5 6 6 6l1.2-1.6c.2-.27.15-.6-.1-.78l-1.7-1.2a.55.55 0 00-.7.06l-.5.5a4.6 4.6 0 01-2.68-2.68l.5-.5a.55.55 0 00.06-.7l-1.2-1.7a.55.55 0 00-.78-.1L8.5 8.3"
              fill="currentColor"
            />
          </svg>
        </a>
      </Magnetic>
    </div>
  );
}
