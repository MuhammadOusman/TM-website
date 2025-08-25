import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const ScheduleCall = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "KfTQTPLufJDQRkZ"; // Use default if not set

    if (!serviceId || !templateId || !publicKey) {
      alert("Email service not configured. Please check environment variables.");
      return;
    }

    emailjs.sendForm(
      serviceId,
      templateId,
      formRef.current,
      publicKey
    )
      .then(() => {
        alert("Call scheduled successfully!");
        formRef.current?.reset();
      })
      .catch(() => {
        alert("Failed to schedule call. Please try again later.");
      });
  };

  return (
    <div>
      <SEO title="Schedule a Call | Talha Musharraf" description="Book a call to discuss Dubai luxury real estate." canonical="/schedule" />
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-playfair text-3xl">Schedule a Call</h1>
        <p className="mt-2 text-muted-foreground">Share your details and a convenient time. We'll get back to you quickly.</p>
        <form ref={formRef} className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input name="name" required placeholder="Full name" className="w-full rounded-md border border-border bg-background px-3 py-2" />
          <input name="email" required type="email" placeholder="Email" className="w-full rounded-md border border-border bg-background px-3 py-2" />
          <input name="phone" placeholder="Phone (optional)" className="w-full rounded-md border border-border bg-background px-3 py-2" />
          <input name="preferred_time" placeholder="Preferred time (e.g., Tue 3PM GST)" className="w-full rounded-md border border-border bg-background px-3 py-2" />
          <textarea name="message" placeholder="Anything specific you'd like to discuss?" className="h-28 w-full rounded-md border border-border bg-background px-3 py-2" />
          <Button variant="hero" type="submit">Schedule Call</Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ScheduleCall;
