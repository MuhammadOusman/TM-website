import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface DbProperty {
  id: string;
  slug: string;
  title: string;
  price: string;
  location: string | null;
  type: string | null;
  description: string | null;
  image_url: string | null;
}

const PropertyDetails = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState<DbProperty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data, error } = await (supabase as any)
        .from("properties")
        .select("id, slug, title, price, location, type, description, image_url")
        .eq("slug", slug)
        .maybeSingle();
      if (!error) setProperty(data);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div>
        <SEO title="Loading property..." description="Loading" canonical={`/properties/${slug || ""}`} />
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div>
        <SEO title="Property not found" description="This property was not found." canonical={`/properties/${slug || ""}`} />
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="font-playfair text-3xl">Property not found</h1>
          <p className="mt-4 text-muted-foreground">Please browse all listings.</p>
          <div className="mt-6"><a className="story-link" href="/properties">← Back to properties</a></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <SEO title={`${property.title} | Talha Musharraf`} description={`Explore ${property.title} in ${property.location || "Dubai"}.`} canonical={`/properties/${property.slug}`} />
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <article className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elevated">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={property.image_url || "/placeholder.svg"} alt={`${property.title} image`} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h1 className="font-playfair text-3xl">{property.title}</h1>
            <p className="mt-2 text-muted-foreground">{property.location} • {property.type}</p>
            <p className="mt-4 text-primary text-xl font-semibold">{property.price}</p>

            <div className="prose prose-invert mt-6 max-w-none">
              <p>{property.description || "No description provided yet."}</p>
            </div>

            <div className="mt-8 flex gap-3">
              <a href="/schedule"><Button variant="hero">Schedule a Call</Button></a>
              <a href="/contact"><Button variant="secondary">Contact</Button></a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
