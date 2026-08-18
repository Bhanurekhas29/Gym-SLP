import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const BUTTONS_CONFIG = [
  {
    key: "whatsapp",
    Icon: FaWhatsapp,
    label: "WhatsApp",
    color: "bg-[#25D366] hover:bg-[#1fbd5a] shadow-[#25D366]/40",
  },
  {
    key: "call",
    Icon: FiPhone,
    label: "Call us",
    color: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/40",
  },
  {
    key: "email",
    Icon: FiMail,
    label: "Email",
    color: "bg-neutral-800 hover:bg-neutral-700 shadow-black/40",
  },
];

export default function FloatingButtons({ whatsappLink, phoneNumber, email }) {
  const hrefs = {
    whatsapp: whatsappLink,
    call: phoneNumber ? `tel:${phoneNumber.replace(/\s/g, "")}` : null,
    email: email ? `mailto:${email}` : null,
  };

  const buttons = BUTTONS_CONFIG.filter((b) => hrefs[b.key]);
  if (buttons.length === 0) return null;

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {buttons.map(({ key, Icon, label, color }) => (
        <a
          key={key}
          href={hrefs[key]}
          target={key === "whatsapp" ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={label}
          className="group flex items-center"
        >
          <span className="mr-2 hidden translate-x-2 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            {label}
          </span>
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 ease-out hover:scale-110 ${color}`}
          >
            <Icon size={22} />
          </span>
        </a>
      ))}
    </div>
  );
}
