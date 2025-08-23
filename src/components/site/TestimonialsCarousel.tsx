import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react"; // Import Star icon
import { Loader } from "@/components/ui/Loader"; // Import Loader

interface ReviewItem {
  name: string;
  text: string;
  rating: number; // Add rating to the interface
}

export const TestimonialsCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [items, setItems] = useState<ReviewItem[]>([]); // Update state type
  const [loading, setLoading] = useState(true); // Add loading state

  // Autoplay every 5s
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [api]);

  useEffect(() => {
    const load = async () => {
      setLoading(true); // Set loading to true
      try {
        const { data, error } = await (supabase as any)
          .from("reviews")
          .select("name, text, rating, created_at")
          .order("created_at", { ascending: false })
          .limit(12);
        
        if (error) {
          console.error('Error fetching reviews:', error);
          setItems([]);
        } else if (!data || data.length === 0) {
          setItems([]);
        } else {
          setItems(data);
        }
      } catch (error) {
        console.error('Error in load function:', error);
        setItems([]); // Ensure items are cleared on unexpected errors
      } finally {
        setLoading(false); // Set loading to false in finally block
      }
    };
    load();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="mb-6 font-playfair text-3xl">Client Testimonials</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader loading={true} size={25} />
        </div>
      ) : items.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground">No testimonials found.</p>
      ) : (
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {items.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <motion.blockquote
                  className="rounded-xl border border-border bg-card p-6 shadow-elevated"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-2"> {/* Add div for stars */}
                    {renderStars(t.rating)}
                  </div>
                  <p className="text-muted-foreground">“{t.text}”</p>
                  <footer className="mt-4 text-primary">— {t.name}</footer>
                </motion.blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </section>
  );
};

export default TestimonialsCarousel;
