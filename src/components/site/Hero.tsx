import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-luxury.jpg";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <header className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden">
      <SEO
        title="Talha Musharraf | Luxury Real Estate Dubai"
        description="Premium Dubai properties with gold‑standard service. Explore listings, reviews, and insights with Talha Musharraf."
        canonical="/"
      />
      <motion.img
        src={heroImage}
        alt="Dubai luxury skyline hero"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y, opacity }}
        loading="eager"
      />

      {/* Gold particles/glow */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at 20% 30%, hsla(51,100%,50%,0.25) 0, transparent 40%),
                       radial-gradient(circle at 80% 70%, hsla(51,100%,50%,0.2) 0, transparent 45%)`
        }} />
      </div>

      <main className="relative z-10 mx-auto flex h-[80vh] md:h-[90vh] max-w-6xl flex-col items-start justify-center px-6">
        <p className="mb-2 text-sm tracking-widest text-muted-foreground uppercase">Dubai Luxury Real Estate</p>
        <h1 className="font-playfair text-4xl md:text-6xl leading-tight max-w-2xl">
          Gold‑standard property advisory by <span className="text-primary">Talha Musharraf</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Exclusive homes, seamless transactions, and trusted guidance for investors and families.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/properties"><Button variant="hero" size="lg">View Properties</Button></a>
        </div>
      </main>
    </header>
  );
};

export default Hero;
