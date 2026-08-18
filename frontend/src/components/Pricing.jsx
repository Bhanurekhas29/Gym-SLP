import { FiCheck } from "react-icons/fi";
import useInView from "../hooks/useInView";

function PlanCard({ plan, delay, inView }) {
  return (
    <div
      className={`group relative rounded-2xl border p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] ${
        plan.is_featured
          ? "border-orange-500/60 bg-gradient-to-b from-orange-500/[0.08] to-white/5 shadow-[0_0_50px_-12px_rgba(249,115,22,0.4)] hover:shadow-[0_0_70px_-10px_rgba(249,115,22,0.55)]"
          : "border-white/10 bg-white/5 shadow-lg shadow-black/20 hover:border-orange-500/40 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.3)]"
      } ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {plan.is_featured && plan.badge_text && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-orange-500/30">
          {plan.badge_text}
        </div>
      )}

      <h3 className="font-heading text-xl tracking-tight text-white uppercase">{plan.name}</h3>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-heading text-4xl text-orange-500 transition-transform duration-300 ease-out group-hover:scale-105">
          ₹{plan.price.toLocaleString("en-IN")}
        </span>
        <span className="text-sm text-neutral-400">{plan.period}</span>
      </div>

      {plan.features?.length > 0 && (
        <ul className="mt-8 space-y-3">
          {plan.features.map((feature) => (
            <li
              key={feature.text}
              className="flex items-center gap-2 text-sm text-neutral-300 transition-colors duration-300 group-hover:text-neutral-200"
            >
              <FiCheck className="shrink-0 text-orange-500 transition-transform duration-300 group-hover:scale-125" />
              {feature.text}
            </li>
          ))}
        </ul>
      )}

      <a
        href={plan.cta_link}
        className={`mt-10 flex items-center justify-center rounded-full py-3 text-sm font-semibold transition-all duration-300 ease-out ${
          plan.is_featured
            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/40"
            : "border border-white/20 text-white hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-500/10"
        }`}
      >
        {plan.cta_text}
      </a>
    </div>
  );
}

export default function Pricing({ pricing }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  if (!pricing) return null;

  return (
    <section ref={ref} id="pricing" className="border-t border-white/10 bg-neutral-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="text-xs font-semibold tracking-widest text-orange-500 uppercase">
            {pricing.eyebrow_text}
          </div>
          <h2 className="font-heading mt-4 text-2xl leading-tight tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {pricing.heading}
          </h2>
        </div>

        {pricing.plans?.length > 0 && (
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricing.plans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} delay={150 + i * 120} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
