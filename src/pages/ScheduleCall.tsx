import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const ScheduleCall = () => {
  return (
    <div>
      <SEO title="Schedule a Call | Talha Musharraf" description="Book a call to discuss Dubai luxury real estate." canonical="/schedule" />
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-playfair text-3xl">Schedule a Call</h1>
        <p className="mt-2 text-muted-foreground">Share your details and a convenient time. We'll get back to you quickly.</p>
        <form name="schedule-call" method="POST" data-netlify="true" className="mt-6 space-y-4">
          <input type="hidden" name="form-name" value="schedule-call" />
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
