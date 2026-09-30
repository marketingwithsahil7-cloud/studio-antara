export const site = {
  name: "Antara",
  fullName: "Studio Antara",
  tagline: "Spaces that hold quiet.",
  demo: {
    badge: "Concept project — Studio Antara is a fictional studio. Design & build by @sahilbuilds.",
    isDemo: true,
  },
  contact: {
    // Fictional contact details for this concept demo — not a real studio,
    // not a real phone number/inbox. See the footer badge + noindex above.
    whatsapp: "919876543210",
    email: "hello@studioantara.in",
    phone: "+91 98765 43210",
    instagram: "https://instagram.com/studioantara",
    addressLines: ["Studio Antara", "B-42, Sunder Nagar", "New Delhi 110003"],
  },
  meta: {
    establishedYear: "2017",
  },
  qualifier: "We take on 10–12 projects a year. Minimum project value ₹75 lakh.",
  nav: [
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  cta: {
    primary: "Begin a conversation",
  },
} as const;

export function whatsappHref(prefilledText: string) {
  const encoded = encodeURIComponent(prefilledText);
  return `https://wa.me/${site.contact.whatsapp}?text=${encoded}`;
}
