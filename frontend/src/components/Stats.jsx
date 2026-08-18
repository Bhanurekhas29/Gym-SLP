import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";

function StatItem({ value, suffix, label, decimals, animate, delay }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let raf;
    const duration = 1500;
    const start = performance.now() + delay;

    const tick = (now) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, value, delay]);

  const formatted = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString("en-IN");

  return (
    <div className="animate-fade-up text-center" style={{ animationDelay: `${delay}ms` }}>
      <div className="font-heading text-2xl text-orange-500 sm:text-3xl">
        {formatted}
        {suffix}
      </div>
      <div className="mt-2 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
        {label}
      </div>
    </div>
  );
}

export default function Stats({ stats }) {
  const [ref, inView] = useInView({ threshold: 0.3 });

  if (!stats || stats.length === 0) return null;

  return (
    <section ref={ref} className="border-t border-b border-white/10 bg-neutral-950">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            decimals={stat.decimals}
            animate={inView}
            delay={i * 120}
          />
        ))}
      </div>
    </section>
  );
}
