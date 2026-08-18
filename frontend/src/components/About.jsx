import useInView from "../hooks/useInView";

export default function About({ about }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  if (!about) return null;

  return (
    <section ref={ref} id="about" className="bg-neutral-950 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {about.image && (
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.35)] hover:ring-orange-500/40">
              <img
                src={about.image}
                alt={about.heading}
                className="h-auto w-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/0 via-orange-600/0 to-orange-600/0 opacity-0 transition-opacity duration-500 group-hover:from-orange-600/25 group-hover:opacity-100" />
            </div>
          )}

          {about.stats?.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {about.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-orange-500/50 hover:bg-white/[0.08] hover:shadow-[0_15px_40px_-12px_rgba(249,115,22,0.3)] ${
                    inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: inView ? `${200 + i * 120}ms` : "0ms" }}
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <div className="font-heading text-3xl text-orange-500 transition-transform duration-500 ease-out group-hover:scale-110">
                    {stat.display_value}
                  </div>
                  <div className="mt-1 text-xs font-semibold tracking-widest text-neutral-400 uppercase transition-colors duration-500 group-hover:text-neutral-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`transition-all delay-150 duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="text-xs font-semibold tracking-widest text-orange-500 uppercase">
            {about.eyebrow_text}
          </div>
          <h2 className="font-heading mt-4 text-2xl leading-tight tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {about.heading}
          </h2>
          <p className="mt-6 max-w-xl text-neutral-400">{about.description}</p>

          {about.features?.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {about.features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 pl-6 shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-orange-500/50 hover:bg-white/[0.08] hover:shadow-[0_15px_40px_-12px_rgba(249,115,22,0.3)] ${
                    inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: inView ? `${350 + i * 100}ms` : "0ms" }}
                >
                  <div className="absolute top-0 left-0 h-full w-1 origin-top scale-y-0 bg-orange-500 transition-transform duration-500 ease-out group-hover:scale-y-100" />
                  <div className="font-semibold text-white transition-colors duration-300 group-hover:text-orange-400">
                    {feature.title}
                  </div>
                  <div className="mt-1 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
