import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import PropertyCard, { Property } from "@/components/site/PropertyCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "@/components/ui/Loader"; // Import Loader

const Properties = () => {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const load = async () => {
      setLoading(true); // Set loading to true
      try {
        const { data, error } = await (supabase as any)
          .from("properties")
          .select("id, slug, title, price, location, type, image_url")
          .order("created_at", { ascending: false });
        
        if (error) {
          console.error('Error fetching properties:', error);
          setItems([]);
        } else if (!data || data.length === 0) {
          setItems([]);
        } else {
          const mapped: Property[] = data.map((d: any) => ({
            id: d.slug || d.id,
            title: d.title,
            price: d.price,
            location: d.location || "Dubai",
            image: d.image_url || "/placeholder.svg",
            type: d.type || "Property",
          }));
          setItems(mapped);
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

  return (
    <div>
      <SEO title="Dubai Luxury Properties | Talha Musharraf" description="Search luxury properties in Dubai by price, location, and type." canonical="/properties" />
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-playfair text-3xl">Property Listings</h1>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader loading={true} size={25} />
          </div>
        ) : items.length === 0 ? (
          <p className="mt-8 text-center text-muted-foreground">No properties found.</p>
        ) : (
          <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default Properties;
