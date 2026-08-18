import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import About from "./components/About.jsx";
import Programs from "./components/Programs.jsx";
import CTA from "./components/CTA.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Pricing from "./components/Pricing.jsx";
import Contact from "./components/Contact.jsx";
import Trainers from "./components/Trainers.jsx";
import Footer from "./components/Footer.jsx";
import FloatingButtons from "./components/FloatingButtons.jsx";
import api from "./api/client.js";

export default function App() {
  const [settings, setSettings] = useState(null);
  const [hero, setHero] = useState(null);
  const [stats, setStats] = useState(null);
  const [about, setAbout] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [cta, setCta] = useState(null);
  const [testimonials, setTestimonials] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [contact, setContact] = useState(null);
  const [trainers, setTrainers] = useState(null);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    api.get("site-settings/").then((res) => setSettings(res.data));
    api.get("hero/").then((res) => setHero(res.data));
    api.get("stats/").then((res) => setStats(res.data));
    api.get("about/").then((res) => setAbout(res.data));
    api.get("programs/").then((res) => setPrograms(res.data));
    api.get("cta/").then((res) => setCta(res.data));
    api.get("testimonials/").then((res) => setTestimonials(res.data));
    api.get("pricing/").then((res) => setPricing(res.data));
    api.get("contact/").then((res) => setContact(res.data));
    api.get("trainers/").then((res) => setTrainers(res.data));
    api.get("footer/").then((res) => setFooter(res.data));
  }, []);

  useEffect(() => {
    if (!settings) return;
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
  }, [settings]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Navbar settings={settings} />
      <Hero hero={hero} phoneNumber={settings?.phone_number} />
      <Stats stats={stats} />
      <About about={about} />
      <Programs programs={programs} />
      <Trainers trainers={trainers} />
      <CTA cta={cta} />
      <Testimonials testimonials={testimonials} />
      <Pricing pricing={pricing} />
      <Contact contact={contact} />
      <Footer footer={footer} settings={settings} programs={programs} />
      <FloatingButtons
        whatsappLink={settings?.whatsapp_link}
        phoneNumber={settings?.phone_number}
        email={contact?.contact_email}
      />
    </div>
  );
}
