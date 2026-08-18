import { FiArrowRight } from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";
import useInView from "../hooks/useInView";
import { ICONS } from "../lib/icons";

export default function CTA({ cta }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  if (!cta) return null;

  return (
    <section ref={ref} className="border-t border-white/10 bg-neutral-950 pt-12 pb-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {cta.image && (
            <div className="group overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.35)] hover:ring-orange-500/40">
              <img
                src={cta.image}
                alt={cta.heading_highlight}
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          )}
        </div>

        <div
          className={`transition-all delay-150 duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            {cta.eyebrow_text}
          </div>

          <h2 className="font-heading mt-4 text-2xl leading-tight tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {cta.heading_before} <span className="text-orange-500">{cta.heading_highlight}</span>{" "}
            {cta.heading_after}
          </h2>

          <p className="mt-4 text-neutral-400">{cta.subtext}</p>

          {cta.features?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
              {cta.features.map((feature) => {
                const Icon = ICONS[feature.icon] || FaDumbbell;
                return (
                  <div key={feature.title} className="group flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-orange-500/20">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{feature.title}</div>
                      <div className="text-xs text-neutral-400">{feature.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <a
            href={cta.cta_link}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-orange-500 py-3 pr-3 pl-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30 active:translate-y-0"
          >
            {cta.cta_text}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
              <FiArrowRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
