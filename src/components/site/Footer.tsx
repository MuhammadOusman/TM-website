export const Footer = () => (
  <footer className="mt-20 border-t border-border/60 bg-secondary/40">
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="font-playfair text-xl">Talha Musharraf</p>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <a href="/properties" className="story-link">Properties</a>
          <a href="/reviews" className="story-link">Reviews</a>
          <a href="/blog" className="story-link">Blog</a>
          <a href="/about" className="story-link">About</a>
          <a href="/contact" className="story-link">Contact</a>
        </nav>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Talha Musharraf. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
