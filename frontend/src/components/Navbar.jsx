import { useState } from "react";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

export default function Navbar({ settings }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!settings) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-orange-500/40 bg-neutral-950 shadow-[0_2px_30px_-2px_rgba(249,115,22,0.55)] dark:bg-neutral-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="font-heading text-xl tracking-widest">
          <span className="text-white">{settings.logo_text_primary}</span>
          <span className="text-orange-500">{settings.logo_text_secondary}</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {settings.nav_links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className="text-sm text-neutral-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {settings.phone_number && (
            <a
              href={`tel:${settings.phone_number.replace(/\s/g, "")}`}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white"
            >
              <FiPhone className="text-orange-500" />
              {settings.phone_number}
            </a>
          )}
          <a
            href={settings.cta_link}
            className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <BsChatDots />
            {settings.cta_text}
          </a>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 lg:hidden">
          {settings.nav_links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className="text-sm text-neutral-300 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {settings.phone_number && (
            <a
              href={`tel:${settings.phone_number.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-white"
            >
              <FiPhone className="text-orange-500" />
              {settings.phone_number}
            </a>
          )}
          <a
            href={settings.cta_link}
            className="flex w-fit items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <BsChatDots />
            {settings.cta_text}
          </a>
        </div>
      )}
    </header>
  );
}
