import { Button } from "@/components/ui/button";

export type Property = {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  type: string;
};

export const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-elevated">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={property.image}
          alt={`${property.title} in ${property.location}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* gold overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="font-playfair text-lg">{property.title}</h3>
        <p className="text-sm text-muted-foreground">{property.location} • {property.type}</p>
        <p className="text-primary font-medium">{property.price}</p>
        <div className="pt-2">
          <a href={`/properties/${property.id}`}>
            <Button variant="premium" size="sm">View Details</Button>
          </a>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
