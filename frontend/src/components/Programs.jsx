import { FiCheck } from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";
import useInView from "../hooks/useInView";
import { ICONS } from "../lib/icons";
import CardShine from "./CardShine";

function ProgramCard({ program, delay, inView }) {
  const Icon = ICONS[program.icon] || FaDumbbell;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-500/50 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.35)] ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-orange-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <CardShine />

      {program.image && (
        <div className="absolute inset-0">
          <img
            src={program.image}
            alt={program.title}
            className="h-full w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-neutral-950/55 transition-colors duration-500 group-hover:from-neutral-950/95 group-hover:via-neutral-950/80" />
        </div>
      )}

      <div className="relative z-10">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg text-orange-500 transition-all duration-500 ease-out group-hover:scale-110 ${
            program.image
              ? "bg-orange-500/20 backdrop-blur-sm group-hover:bg-orange-500/30"
              : "bg-orange-500/10 group-hover:bg-orange-500/20"
          }`}
        >
          <Icon size={22} className="transition-transform duration-500 ease-out group-hover:-rotate-6" />
        </div>

        <h3 className="font-heading mt-6 text-xl tracking-tight text-white uppercase transition-colors duration-300 group-hover:text-orange-400">
          {program.title}
        </h3>

        <p
          className={`mt-3 text-sm transition-colors duration-300 ${
            program.image
              ? "text-neutral-300 group-hover:text-neutral-200"
              : "text-neutral-400 group-hover:text-neutral-300"
          }`}
        >
          {program.description}
        </p>

        {program.features?.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {program.features.map((feature) => (
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
      </div>
    </div>
  );
}

export default function Programs({ programs }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  if (!programs) return null;

  return (
    <section ref={ref} id="programs" className="bg-neutral-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="text-xs font-semibold tracking-widest text-orange-500 uppercase">
            {programs.eyebrow_text}
          </div>
          <h2 className="font-heading mt-4 text-2xl leading-tight tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {programs.heading}
          </h2>
        </div>

        {programs.programs?.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {programs.programs.map((program, i) => (
              <ProgramCard
                key={program.title}
                program={program}
                delay={150 + i * 120}
                inView={inView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
