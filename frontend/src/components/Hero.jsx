import { FaFire } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

export default function Hero({ hero, phoneNumber }) {
  if (!hero) return null;

  return (
    <section
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-neutral-950 bg-cover bg-center"
      style={
        hero.background_image
          ? { backgroundImage: `url(${hero.background_image})` }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-neutral-950/90 via-neutral-950/35 to-transparent sm:w-3/5" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24">
        <div
          className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/40 px-4 py-1.5 text-xs font-semibold tracking-widest text-orange-400 uppercase transition-colors hover:border-orange-500"
          style={{ animationDelay: "0ms" }}
        >
          <FaFire className="text-orange-500" />
          {hero.badge_text}
        </div>

        <h1 className="font-heading max-w-2xl text-5xl leading-[1.05] tracking-tight uppercase sm:text-6xl lg:text-7xl">
          <span
            className="animate-fade-up block text-white"
            style={{ animationDelay: "100ms" }}
          >
            {hero.heading_line1}
          </span>
          <span
            className="animate-fade-up block text-orange-500"
            style={{ animationDelay: "220ms" }}
          >
            {hero.heading_line2}
          </span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-lg text-lg text-neutral-400"
          style={{ animationDelay: "340ms" }}
        >
          {hero.description}
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "440ms" }}
        >
          <a
            href={hero.cta_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30 active:translate-y-0"
          >
            <BsChatDots />
            {hero.cta_text}
          </a>

          {phoneNumber && (
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 active:translate-y-0"
            >
              <FiPhone className="text-orange-500" />
              {phoneNumber}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
