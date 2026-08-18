import { useState } from "react";
import { FiPhone, FiMail, FiArrowRight, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import useInView from "../hooks/useInView";

const ICONS = {
  phone: FiPhone,
  chat: BsChatDots,
  email: FiMail,
};

function MethodCard({ method, delay, inView }) {
  const Icon = ICONS[method.icon] || FiPhone;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-orange-500/50 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.35)] ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <Icon className="text-2xl text-orange-500 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6" />
      <h3 className="font-heading mt-4 text-sm tracking-widest text-white uppercase">
        {method.title}
      </h3>
      <p className="mt-1 text-sm text-neutral-400">{method.subtitle}</p>
      <a
        href={method.link_href}
        target={method.link_href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 transition-all duration-300 group-hover:gap-2.5"
      >
        {method.link_text}
        <FiArrowRight />
      </a>
    </div>
  );
}

export default function Contact({ contact }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [form, setForm] = useState({ name: "", phone: "", topic: "", message: "" });

  if (!contact) return null;

  const topic = form.topic || contact.topics?.[0] || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${topic} — ${form.name || "Website enquiry"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nTopic: ${topic}\n\n${form.message}`,
    );
    window.location.href = `mailto:${contact.contact_email}?subject=${subject}&body=${body}`;
  };

  return (
    <section ref={ref} id="contact" className="border-t border-white/10 bg-neutral-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="text-xs font-semibold tracking-widest text-orange-500 uppercase">
            {contact.eyebrow_text}
          </div>
          <h2 className="font-heading mt-4 text-2xl leading-tight tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {contact.heading}
          </h2>
        </div>

        {contact.methods?.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contact.methods.map((method, i) => (
              <MethodCard key={method.title} method={method} delay={150 + i * 100} inView={inView} />
            ))}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div
            className={`rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/20 transition-all duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: inView ? "500ms" : "0ms" }}
          >
            <h3 className="font-heading text-lg tracking-tight text-white uppercase">
              Send an Enquiry
            </h3>
            <p className="mt-1 text-sm text-neutral-400">{contact.form_intro}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                  Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-orange-500"
                >
                  {contact.topics?.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us your goals or question"
                  className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30 active:translate-y-0"
              >
                <FiSend />
                Send enquiry
              </button>
            </form>
          </div>

          <div
            className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition-all duration-700 ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: inView ? "600ms" : "0ms" }}
          >
            <iframe
              title="Location map"
              src={contact.maps_embed_url}
              className="h-64 w-full grayscale invert"
              loading="lazy"
            />
            <div className="p-6">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-orange-500" />
                <div>
                  <div className="text-sm font-semibold text-white">Visit the club</div>
                  <div className="text-sm text-neutral-400">{contact.address_line}</div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <FiClock className="mt-0.5 shrink-0 text-orange-500" />
                <div>
                  <div className="text-sm font-semibold text-white">Opening hours</div>
                  <div className="text-sm text-neutral-400">{contact.opening_hours}</div>
                </div>
              </div>
              <a
                href={contact.maps_directions_url}
                target="_blank"
                rel="noreferrer"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500"
              >
                Get directions
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
