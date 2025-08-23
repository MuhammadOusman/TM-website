
import React from "react";

const ImageCollage: React.FC = () => {
  return (
    <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 animate-fade-in">
      {/* Left image - slight down offset on desktop */}
      <div className="relative group md:translate-y-6">
        <img
          src="/placeholder.svg"
          alt="Talha — professional portrait"
          className="rounded-xl object-cover w-full h-72 md:h-80 hover-scale gold-ring shadow-elevated"
          loading="lazy"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="absolute bottom-3 left-3 rounded border border-border/60 bg-background/60 px-2 py-1 text-xs backdrop-blur">
          Advisor
        </span>
      </div>

      {/* Center image - taller focal */}
      <div className="relative group">
        <img
          src="/placeholder.svg"
          alt="Talha — luxury real estate branding"
          className="rounded-xl object-cover w-full h-96 hover-scale shadow-glow gold-ring"
          loading="lazy"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="absolute bottom-3 left-3 rounded border border-border/60 bg-background/60 px-2 py-1 text-xs backdrop-blur">
          Dubai Prime
        </span>
      </div>

      {/* Right image - slight up offset on desktop */}
      <div className="relative group md:-translate-y-6">
        <img
          src="/placeholder.svg"
          alt="Talha — client-focused results"
          className="rounded-xl object-cover w-full h-72 md:h-80 hover-scale gold-ring shadow-elevated"
          loading="lazy"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="absolute bottom-3 left-3 rounded border border-border/60 bg-background/60 px-2 py-1 text-xs backdrop-blur">
          Results
        </span>
      </div>
    </section>
  );
};

export default ImageCollage;
