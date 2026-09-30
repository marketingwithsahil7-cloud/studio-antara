"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { FloatingField } from "@/components/ui/FloatingField";
import { SegmentedField } from "@/components/ui/SegmentedField";
import { site, whatsappHref } from "@/config/site";
import { copy } from "@/content/copy";

const projectTypes = ["Residence", "Farmhouse", "Apartment", "Commercial"] as const;
const budgetRanges = ["₹75L–1.5Cr", "₹1.5–4Cr", "₹4Cr+", "Not sure yet"] as const;
const timelines = ["Ready to start", "1–3 months", "Exploring"] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(8, "Please enter a valid phone or WhatsApp number"),
  email: z.union([z.string().email("Please enter a valid email"), z.literal("")]),
  projectType: z.enum(projectTypes, { message: "Please select a project type" }),
  location: z.string().min(2, "Please enter a location"),
  builtUpArea: z.string(),
  budgetRange: z.enum(budgetRanges, { message: "Please select a budget range" }),
  timeline: z.enum(timelines, { message: "Please select a timeline" }),
  message: z.string(),
});

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: (typeof projectTypes)[number] | "";
  location: string;
  builtUpArea: string;
  budgetRange: (typeof budgetRanges)[number] | "";
  timeline: (typeof timelines)[number] | "";
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  location: "",
  builtUpArea: "",
  budgetRange: "",
  timeline: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("opening");

    const lines = [
      `Hi ${site.fullName}, I'd like to begin a conversation about a project.`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      `Project type: ${form.projectType}`,
      `Location: ${form.location}`,
      form.builtUpArea && `Approx. built-up area: ${form.builtUpArea}`,
      `Budget range: ${form.budgetRange}`,
      `Timeline: ${form.timeline}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);

    // TODO(backend): once a real intake endpoint exists (Resend/Formspree),
    // POST `form` here too, so a submission is captured even if the visitor
    // never completes the WhatsApp handoff below.
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");

    window.setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <FloatingField
          id="name"
          label="Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
          required
        />
        <FloatingField
          id="phone"
          label="Phone / WhatsApp"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
          required
        />
      </div>

      <FloatingField
        id="email"
        label="Email (optional)"
        type="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />

      <SegmentedField
        label="Project type"
        options={projectTypes}
        value={form.projectType}
        onChange={(v) => update("projectType", v)}
        error={errors.projectType}
        required
      />

      <div className="grid gap-9 sm:grid-cols-2">
        <FloatingField
          id="location"
          label="Location"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          error={errors.location}
          required
        />
        <FloatingField
          id="builtUpArea"
          label="Approx. built-up area (optional)"
          value={form.builtUpArea}
          onChange={(e) => update("builtUpArea", e.target.value)}
          error={errors.builtUpArea}
        />
      </div>

      <SegmentedField
        label="Budget range"
        options={budgetRanges}
        value={form.budgetRange}
        onChange={(v) => update("budgetRange", v)}
        error={errors.budgetRange}
        required
      />

      <SegmentedField
        label="Timeline"
        options={timelines}
        value={form.timeline}
        onChange={(v) => update("timeline", v)}
        error={errors.timeline}
        required
      />

      <FloatingField
        id="message"
        label="Message (optional)"
        as="textarea"
        rows={4}
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
      />

      <div>
        <button
          type="submit"
          disabled={status === "opening"}
          className="inline-flex h-14 items-center gap-2.5 rounded-full bg-brass px-7 font-sans text-sm font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-300 hover:bg-brass-soft disabled:opacity-70"
        >
          {status === "opening" ? "Opening WhatsApp with your details…" : "Send on WhatsApp"}
        </button>
        <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
          {copy.contact.replyNote}
        </p>
      </div>
    </form>
  );
}
