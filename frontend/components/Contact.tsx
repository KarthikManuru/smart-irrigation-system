"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { sections } from "./sections";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-gf-950/60 px-4 py-3 text-sm outline-none transition placeholder:text-white/40 focus:border-gf-400";

export default function Contact() {
  const { lang } = useLanguage();
  const s = sections[lang];
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send this to the backend API later. For now we only show a thank-you message.
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <section id="contact" className="bg-gf-900 px-6 py-24">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{s.contactTitle}</h2>
          <p className="mt-4 text-white/70">{s.contactSub}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <input
            required
            name="name"
            placeholder={s.name}
            className={inputClass}
            onChange={() => setSent(false)}
          />
          <input
            required
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder={s.phone}
            className={inputClass}
          />
          <textarea
            required
            name="message"
            rows={4}
            placeholder={s.message}
            className={inputClass}
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gf-500 px-6 py-3 font-semibold transition hover:bg-gf-400"
          >
            <Send className="h-4 w-4" /> {s.send}
          </button>
          {sent && (
            <p role="status" className="text-center text-sm text-gf-300">
              {s.sent}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
