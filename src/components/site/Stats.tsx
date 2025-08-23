import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Properties Sold", value: 250 },
  { label: "Happy Clients", value: 180 },
  { label: "Years Experience", value: 7 },
];

export const Stats = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 1500; // ms
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            setCount(Math.round(value * p));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started, value]);

  return (
    <motion.div
      ref={ref}
      className="rounded-lg bg-secondary p-8 text-center shadow-elevated"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-4xl font-playfair text-primary">{count.toLocaleString()}</p>
      <p className="mt-2 text-sm tracking-wide text-muted-foreground">{label}</p>
    </motion.div>
  );
};

export default Stats;
