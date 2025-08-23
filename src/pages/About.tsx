import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import img1 from "@/assets/WhatsApp Image 2025-08-09 at 12.18.58_2e28561a.jpg";
import img2 from "@/assets/WhatsApp Image 2025-08-09 at 12.18.58_b0be44e4.jpg";
import img3 from "@/assets/WhatsApp Image 2025-08-09 at 12.18.59_cdf2a822.jpg";

const About = () => (
  <div>
    <SEO title="About Talha Musharraf" description="Luxury real estate professional serving Dubai's prime locations." canonical="/about" />
    <Navbar />
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-playfair text-3xl md:text-4xl">About Talha Musharraf</h1>
        <Badge variant="secondary" className="gold-ring text-sm">Your Trusted Dubai Real Estate Advisor</Badge>
      </div>

      <article className="prose prose-invert mt-12 max-w-none animate-fade-in space-y-16">
        {/* Section 1: Introduction */}
        <section className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <h2 className="font-playfair text-2xl text-primary">A Vision for Dubai Luxury</h2>
            <p className="mt-4 text-muted-foreground">
              In the dynamic and ever-evolving landscape of Dubai's real estate, Talha Musharraf stands as a beacon of expertise and integrity. With a profound passion for architecture and a deep understanding of market dynamics, Talha has dedicated his career to connecting discerning clients with the city's most exclusive properties. His approach is built on a foundation of trust, transparency, and an unwavering commitment to achieving client objectives.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether you are a seasoned investor seeking high-yield opportunities or a family searching for a dream home, Talha provides a bespoke service that transcends the transactional. He believes that acquiring property in Dubai is not just an investment in real estate, but an investment in a lifestyle of unparalleled luxury and opportunity.
            </p>
          </div>
          <div className="md:w-1/3">
            <img src={img1} alt="Talha Musharraf" className="rounded-xl shadow-elevated w-full h-auto object-cover" loading="lazy" />
          </div>
        </section>

        {/* Section 2: Philosophy */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-2/3">
            <h2 className="font-playfair text-2xl text-primary">Client-Centric Philosophy</h2>
            <p className="mt-4 text-muted-foreground">
              Talha's philosophy is simple: the client's vision is paramount. He invests significant time in understanding the unique aspirations and financial goals of each individual, ensuring a tailored strategy that aligns perfectly with their needs. This client-centric model has been the cornerstone of his success, fostering long-term relationships built on mutual respect and exceptional results.
            </p>
            <p className="mt-4 text-muted-foreground">
              His expertise spans across Dubai's most prestigious districts, including Downtown Dubai, Palm Jumeirah, Dubai Marina, and Emirates Hills. From off-plan projects by world-renowned developers to exclusive listings in the secondary market, Talha's comprehensive portfolio and extensive network provide his clients with unparalleled access to the very best the city has to offer.
            </p>
          </div>
          <div className="md:w-1/3">
            <img src={img2} alt="Dubai Real Estate" className="rounded-xl shadow-elevated w-full h-auto object-cover" loading="lazy" />
          </div>
        </section>

        {/* Section 3: Beyond the Transaction */}
        <section className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <h2 className="font-playfair text-2xl text-primary">Beyond the Transaction</h2>
            <p className="mt-4 text-muted-foreground">
              For Talha, a successful real estate journey does not end with the signing of a contract. He provides a comprehensive, end-to-end service that includes market analysis, legal guidance, and property management advice. His goal is to ensure a seamless and rewarding experience for his clients, from the initial consultation to long after the keys have been handed over.
            </p>
            <p className="mt-4 text-muted-foreground">
              Embark on your Dubai real estate journey with a professional who is as invested in your success as you are. Connect with Talha Musharraf today to explore how your property ambitions can be transformed into reality.
            </p>
          </div>
          <div className="md:w-1/3">
            <img src={img3} alt="Luxury Living in Dubai" className="rounded-xl shadow-elevated w-full h-auto object-cover" loading="lazy" />
          </div>
        </section>
      </article>

      <div className="mt-16 text-center">
        <a className="story-link text-lg" href="/contact">Connect with Talha →</a>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
