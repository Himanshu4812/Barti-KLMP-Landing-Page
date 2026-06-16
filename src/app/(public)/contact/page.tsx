"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const CONTACT_DETAILS = {
  address: "Dr. Babasaheb Ambedkar Research and Training Institute,\nGovernment of Maharashtra,\nHanuman Nagar, Byculla East,\nMumbai - 400027, Maharashtra, India",
  phone: "+91 22 2373 1100",
  email: "library@barti.maharashtra.gov.in",
  hours: "Monday - Friday: 9:30 AM - 5:30 PM\nSaturday: 10:00 AM - 2:00 PM\nClosed on Public Holidays",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Your message has been submitted successfully. Our team will get back to you within 2-3 business days.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="bg-navy pt-28 pb-20 md:pt-36 md:pb-28">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              Have a question, feedback, or want to learn more about our library services?
              We&apos;d love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-primary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl font-bold text-navy mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-border-light bg-card-bg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-border-light bg-card-bg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-border-light bg-card-bg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl border border-border-light bg-card-bg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all resize-y"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-light transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending..." : "Submit Message"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card-bg rounded-2xl p-8 shadow-sm border border-border-light sticky top-28">
                <h2 className="font-heading text-2xl font-bold text-navy mb-8">Institute Details</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-sm mb-1">Address</h4>
                      <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">{CONTACT_DETAILS.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-sm mb-1">Phone</h4>
                      <p className="text-text-secondary text-sm">{CONTACT_DETAILS.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-sm mb-1">Email</h4>
                      <p className="text-text-secondary text-sm">{CONTACT_DETAILS.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-sm mb-1">Working Hours</h4>
                      <p className="text-text-secondary text-sm whitespace-pre-line">{CONTACT_DETAILS.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 h-48 bg-gray-100 rounded-xl flex items-center justify-center border border-border-light">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-text-muted mx-auto mb-2" />
                    <p className="text-text-muted text-sm font-medium">Map Placeholder</p>
                    <p className="text-text-muted text-xs mt-1">Interactive map will be embedded here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
