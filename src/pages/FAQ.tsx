import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => (
  <div>
    <SEO title="FAQ | Talha Musharraf" description="Answers to common questions about buying, selling, and investing in Dubai." canonical="/faq" />
    <Navbar />
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-playfair text-3xl">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="mt-6">
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
    </main>
    <Footer />
  </div>
);

export default FAQ;
