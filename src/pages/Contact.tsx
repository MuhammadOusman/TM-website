import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
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
        alert("Message sent successfully!");
        formRef.current?.reset();
      })
      .catch(() => {
        alert("Failed to send message. Please try again later.");
      });
  };

  return (
    <div>
      <SEO title="Contact | Talha Musharraf" description="Get in touch via form, WhatsApp, or email." canonical="/contact" />
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-playfair text-3xl">Contact</h1>
        <section className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <input name="name" required placeholder="Name" className="w-full rounded-md border border-border bg-background px-3 py-2" />
            <input name="email" required type="email" placeholder="Email" className="w-full rounded-md border border-border bg-background px-3 py-2" />
            <input name="phone" placeholder="Phone" className="w-full rounded-md border border-border bg-background px-3 py-2" />
            <textarea name="message" required placeholder="Message" className="h-32 w-full rounded-md border border-border bg-background px-3 py-2" />
            <Button variant="hero" type="submit">Send Message</Button>
          </form>
          <div>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-border">
              <iframe title="Map" className="h-full w-full" src="https://maps.google.com/maps?q=Dubai&t=&z=10&ie=UTF8&iwloc=&output=embed" />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <a className="story-link" href="mailto:info@talhamusharraf.com">Email</a> · {" "}
              <a className="story-link" href="https://wa.me/?text=I'm%20interested%20in%20Dubai%20properties" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
