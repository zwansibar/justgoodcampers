"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — integrate with your email service or API
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start justify-center min-h-[300px]">
        <div className="w-12 h-12 rounded-full bg-nature/10 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-nature" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-xl text-dark mb-2">Message sent!</h3>
        <p className="font-body text-muted text-sm">We&apos;ll get back to you within a few hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
      <h2 className="font-display font-bold text-subheading text-dark mb-6">Send us a message</h2>

      <div>
        <label htmlFor="name" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Smith"
          className="w-full bg-card border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          className="w-full bg-card border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200 cursor-pointer"
        >
          <option value="">Select a topic</option>
          <option value="availability">Checking availability</option>
          <option value="camper-question">Question about a camper</option>
          <option value="booking">Existing booking</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-body text-xs font-medium text-muted uppercase tracking-wider mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your trip — when you're travelling, how many people, any questions..."
          className="w-full bg-card border border-border rounded-xl px-4 py-3 font-body text-ink text-sm outline-none focus:border-accent transition-colors duration-200 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-accent text-white py-4 rounded-xl font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200"
      >
        Send message
      </button>
    </form>
  );
}
