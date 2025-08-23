import React, { useRef, useState, useEffect } from "react";
import Hero from "@/components/site/Hero";
import Stats from "@/components/site/Stats";
import FeaturedCarousel from "@/components/site/FeaturedCarousel";
import TestimonialsCarousel from "@/components/site/TestimonialsCarousel";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloating, { MobileQuickActions } from "@/components/site/QuickActions";
import { Property } from "@/components/site/PropertyCard";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  // ...existing code...

  const mapRef = useRef(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (mapRef.current) {
      observer.observe(mapRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating Review Button */}
      <a href="/review" aria-label="Leave a Review" className="fixed bottom-6 left-6 z-40">
        <Button variant="hero" size="lg">Leave a Review</Button>
      </a>
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedCarousel />
      <TestimonialsCarousel />

      {/* Dubai Map Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20" ref={mapRef}>
        <h2 className="mb-4 font-playfair text-3xl">Dubai Map</h2>
        <div className="overflow-hidden rounded-xl border border-border shadow-elevated">
          {mapVisible ? (
            <iframe
              title="Dubai Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Dubai&output=embed"
              className="h-[420px] w-full"
            />
          ) : (
            <div className="h-[420px] w-full flex items-center justify-center bg-muted">
              <span>Loading map…</span>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="mb-6 font-playfair text-3xl">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Do I need to be in Dubai to buy a property?</AccordionTrigger>
            <AccordionContent>Remote purchases are possible with proper documentation and power of attorney arrangements.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What fees should I expect when buying?</AccordionTrigger>
            <AccordionContent>Expect transfer fees, agency commission, trustee fees, and possible mortgage-related costs.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I get post-handover payment plans?</AccordionTrigger>
            <AccordionContent>Many developers offer flexible plans; options vary by project and inventory.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <WhatsAppFloating />
      <Footer />
    </div>
  );
};

export default Index;
