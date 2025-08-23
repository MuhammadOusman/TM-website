import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react"; // Import Star icon
import { Loader } from "@/components/ui/Loader"; // Import Loader

const Reviews = () => {
  const [items, setItems] = useState<{ name: string; text: string; rating: number }[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const load = async () => {
      setLoading(true); // Set loading to true
      try {
        const { data, error } = await (supabase as any)
          .from("reviews")
          .select("name, text, rating, created_at")
          .order("created_at", { ascending: false });
        
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
    <div>
      <SEO title="Client Reviews | Talha Musharraf" description="Read verified client reviews and experiences working with Talha." canonical="/reviews" />
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-playfair text-3xl">Reviews</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader loading={true} size={25} />
          </div>
        ) : items.length === 0 ? (
          <p className="mt-8 text-center text-muted-foreground">No reviews found.</p>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((r, i) => (
              <li key={i} className="rounded-xl border border-border bg-card p-5 shadow-elevated">
                <div className="flex items-center mb-2"> {/* Add div for stars */}
                  {renderStars(r.rating)}
                </div>
                <p className="text-muted-foreground">“{r.text}”</p>
                <div className="mt-3 text-sm text-primary">— {r.name}</div> {/* Remove numerical rating */}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <a href="/review" className="story-link">Leave your review →</a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
