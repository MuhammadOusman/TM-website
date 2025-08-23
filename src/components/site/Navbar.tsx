import { Button } from "@/components/ui/button";

export const Navbar = () => (
  <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
        <a href="/">
          <img
            src="/favicon.ico" 
            alt="Logo"
            className="h-10 w-10 p-1 bg-gradient-primary shadow-glow rounded-md" 
          />
        </a>
        <a href="/" className="font-playfair text-xl">Talha Musharraf</a>
      </div>
      {/* Desktop navlinks */}
      <nav className="hidden gap-6 md:flex text-sm text-muted-foreground">
        <a className="story-link" href="/properties">Properties</a>
        <a className="story-link" href="/reviews">Reviews</a>
        <a className="story-link" href="/blog">Blog</a>
        <a className="story-link" href="/about">About</a>
        <a className="story-link" href="/contact">Contact</a>
      </nav>
      <a href="/schedule" className="hidden md:block"><Button variant="hero" size="sm">Schedule a Call</Button></a>
      {/* Mobile nav menu */}
      <div className="md:hidden flex items-center">
        <button
          className="p-2 rounded focus:outline-none"
          aria-label="Open menu"
          onClick={() => {
            const menu = document.getElementById('mobile-nav-menu');
            if (menu) menu.classList.toggle('hidden');
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect y="7" width="32" height="2.5" rx="1" fill="#ccc"/><rect y="14.5" width="32" height="2.5" rx="1" fill="#ccc"/><rect y="22" width="32" height="2.5" rx="1" fill="#ccc"/></svg>
        </button>
        <div id="mobile-nav-menu" className="absolute top-16 left-0 w-full bg-background border-b border-border/60 py-4 px-6 flex flex-col gap-4 hidden z-40">
          <a className="story-link" href="/properties">Properties</a>
          <a className="story-link" href="/reviews">Reviews</a>
          <a className="story-link" href="/blog">Blog</a>
          <a className="story-link" href="/about">About</a>
          <a className="story-link" href="/contact">Contact</a>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
