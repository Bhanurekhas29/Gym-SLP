import { useState } from "react";
import { BsQuote } from "react-icons/bs";
import useInView from "../hooks/useInView";
function TestimonialCard({ testimonial }) {
  return (
    <div className="group relative w-80 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-orange-500/50 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.35)]">
      <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <BsQuote className="text-3xl text-orange-500 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-125" />
      <p className="mt-4 text-neutral-300 transition-colors duration-300 group-hover:text-neutral-200">
        {testimonial.quote}
      </p>
      <div className="mt-6 flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-500/30 transition-all duration-300 group-hover:scale-110 group-hover:ring-orange-500/60"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-sm font-semibold text-orange-500 ring-2 ring-orange-500/30 transition-all duration-300 group-hover:scale-110 group-hover:ring-orange-500/60">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-white">{testimonial.name}</div>
          <div className="text-xs text-neutral-400">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ testimonials }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [paused, setPaused] = useState(false);

  const items = testimonials?.testimonials || [];
  const duration = Math.max(items.length * 6, 20);

  if (!testimonials || items.length === 0) return null;

  return (
    <section ref={ref} className="bg-neutral-950 pt-6 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="text-xs font-semibold tracking-widest text-orange-500 uppercase">
            {testimonials.eyebrow_text}
          </div>
          <h2 className="font-heading mt-4 text-2xl leading-tight tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {testimonials.heading}
          </h2>
        </div>
      </div>

      <div
        className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="animate-marquee flex w-max gap-6 px-6"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {[...items, ...items].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
