import type { Metadata } from "next";
import { playfair, dmSans } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/lib/lenis-provider";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Grain } from "@/components/layout/Grain";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Cursor } from "@/components/layout/Cursor";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.fullName} — Architecture & Interiors (Concept Project)`,
  description:
    "Studio Antara is a concept architecture & interiors studio — a demo project, not a real practice.",
  robots: { index: false, follow: false },
  openGraph: {
    title: `${site.fullName} — Concept Project`,
    description:
      "Architecture and interiors for families who want the process handled — and the result to last. A concept demo, not a real studio.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <ScrollProgress />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <WhatsAppButton />
          </PageTransitionProvider>
        </SmoothScrollProvider>
        <Cursor />
        <Grain />
      </body>
    </html>
  );
}
