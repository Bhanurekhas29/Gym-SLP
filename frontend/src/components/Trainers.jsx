import { FiUser } from "react-icons/fi";
import useInView from "../hooks/useInView";
function TrainerCard({ trainer, delay, inView }) {
  return (
    <div
      className={`group relative aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/30 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-500/50 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.4)] ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {trainer.image ? (
        <img
          src={trainer.image}
          alt={trainer.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
          <FiUser className="text-6xl text-white/10" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

      <div className="absolute right-0 bottom-0 left-0 z-30 p-5">
        <h3 className="font-heading text-lg tracking-tight text-white uppercase">
          {trainer.name}
        </h3>
        <div className="mt-1 text-sm font-semibold text-orange-500">{trainer.role}</div>
        <div className="mt-1 text-xs text-neutral-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {trainer.credentials}
        </div>
      </div>
    </div>
  );
}

export default function Trainers({ trainers }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  if (!trainers) return null;

  return (
    <section ref={ref} id="trainers" className="border-t border-white/10 bg-neutral-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="text-xs font-semibold tracking-widest text-orange-500 uppercase">
            {trainers.eyebrow_text}
          </div>
          <h2 className="font-heading mt-4 text-2xl leading-tight tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {trainers.heading}
          </h2>
        </div>

        {trainers.trainers?.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {trainers.trainers.map((trainer, i) => (
              <TrainerCard key={trainer.name} trainer={trainer} delay={150 + i * 100} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
