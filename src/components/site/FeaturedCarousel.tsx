import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import PropertyCard, { Property } from "./PropertyCard";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "@/components/ui/Loader"; // Import Loader

export const FeaturedCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [fetched, setFetched] = useState<Property[] | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Autoplay every 4s
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(id);
  }, [api]);

  // Fetch featured from Supabase
  useEffect(() => {
    const load = async () => {
      setLoading(true); // Set loading to true
      try {
        const { data, error } = await (supabase as any)
          .from("properties")
          .select("slug, title, price, location, type, image_url, featured")
          .eq("featured", true)
          .order("updated_at", { ascending: false })
          .limit(9);
        
        if (error) {
          console.error('Error fetching featured properties:', error);
          setFetched([]);
        } else if (!data || data.length === 0) {
          setFetched([]);
        } else {
          setFetched(
            data.map((d: any) => ({
              id: d.slug,
              title: d.title,
              price: d.price,
              location: d.location || "Dubai",
              image: d.image_url || "/placeholder.svg",
              type: d.type || "Property",
            }))
          );
        }
      } catch (error) {
        console.error('Error in load function:', error);
        setFetched([]); // Ensure items are cleared on unexpected errors
      } finally {
        setLoading(false); // Set loading to false in finally block
      }
    };
    load();
  }, []);

  const toRender = useMemo(() => fetched || [], [fetched]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-playfair text-3xl">Featured Properties</h2>
        <a href="/properties" className="story-link text-sm text-muted-foreground">Browse all</a>
      </div>
      <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {toRender.map((p) => (
            <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/3">
              <PropertyCard property={p} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default FeaturedCarousel;
