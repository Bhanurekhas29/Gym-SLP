import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter, FaThreads } from "react-icons/fa6";

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  threads: FaThreads,
};

export default function Footer({ footer, settings, programs }) {
  if (!footer) return null;

  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-56 sm:pb-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <a href="/" className="font-heading text-xl tracking-widest">
              <span className="text-white">{settings?.logo_text_primary || "IRON"}</span>
              <span className="text-orange-500">{settings?.logo_text_secondary || "FORGE"}</span>
            </a>
            {footer.tagline && (
              <div className="mt-1 text-xs tracking-widest text-neutral-500 uppercase">
                {footer.tagline}
              </div>
            )}
            <p className="mt-4 max-w-xs text-sm text-neutral-400">{footer.description}</p>

            {footer.social_links?.length > 0 && (
              <div className="mt-6 flex gap-3">
                {footer.social_links.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon] || FaInstagram;
                  return (
                    <a
                      key={social.icon}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.icon}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:text-orange-500"
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {footer.quick_links?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-white uppercase">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5">
                {footer.quick_links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.link}
                      className="text-sm text-neutral-400 transition-colors hover:text-orange-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {programs?.programs?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold tracking-widest text-white uppercase">
                Programs
              </h4>
              <ul className="mt-4 space-y-2.5">
                {programs.programs.map((program) => (
                  <li key={program.title}>
                    <a
                      href="#programs"
                      className="text-sm text-neutral-400 transition-colors hover:text-orange-500"
                    >
                      {program.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500">{footer.copyright_text}</p>
          {footer.legal_links?.length > 0 && (
            <div className="flex gap-6">
              {footer.legal_links.map((link) => (
                <a
                  key={link.label}
                  href={link.link}
                  className="text-xs text-neutral-500 transition-colors hover:text-orange-500"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
