import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppFloating = () => (
  <a
    href="https://wa.me/?text=I'm%20interested%20in%20Dubai%20properties"
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow hover:opacity-90"
  >
    <FaWhatsapp className="h-6 w-6" />
  </a>
);

export const MobileQuickActions = () => (
  <nav className="fixed inset-x-0 bottom-0 z-30 block md:hidden">
    <div className="mx-auto mb-3 w-[92%] rounded-2xl border border-border bg-secondary/80 backdrop-blur supports-[backdrop-filter]:bg-secondary/60 shadow-elevated">
      <ul className="flex items-center justify-around p-3 text-sm">
        <li><a className="story-link" href="/properties">Properties</a></li>
        <li><a className="story-link" href="/reviews">Reviews</a></li>
        <li><a className="story-link" href="https://wa.me/?text=I'm%20interested%20in%20Dubai%20properties" target="_blank" rel="noreferrer">WhatsApp</a></li>
      </ul>
    </div>
  </nav>
);

export default WhatsAppFloating;
