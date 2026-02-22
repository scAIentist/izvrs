"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";

const sectionDefs = [
  { id: "domov", color: "bg-river-blue", hoverGlow: "hover:shadow-river-blue/30" },
  { id: "sledilci", color: "bg-forest-green", hoverGlow: "hover:shadow-forest-green/30" },
  { id: "galerija", color: "bg-amber", hoverGlow: "hover:shadow-amber/30" },
  { id: "igra", color: "bg-danger", hoverGlow: "hover:shadow-danger/30" },
  { id: "o-projektu", color: "bg-river-blue-dark", hoverGlow: "hover:shadow-river-blue-dark/30" },
];

export default function Navigation() {
  const { lang, setLang, t } = useTranslation();
  const [activeSection, setActiveSection] = useState("domov");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const labels: Record<string, string> = {
    domov: t.nav.home,
    sledilci: t.nav.trackers,
    galerija: t.nav.gallery,
    igra: t.nav.game,
    "o-projektu": t.nav.about,
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    for (const section of sectionDefs) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-deep-navy/90 backdrop-blur-xl shadow-2xl shadow-black/20 py-1"
          : "bg-transparent py-2"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("domov")}
            className="flex items-center gap-2.5 group"
          >
            <Image
              src="/mascot-opt/happy.webp"
              alt="Izvrstna"
              width={36}
              height={36}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            />
            <span className="text-base font-bold text-white hidden sm:block tracking-tight">
              Izvrstna
            </span>
          </button>

          {/* Desktop tabs + language toggle */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5">
              {sectionDefs.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? `${section.color} text-white shadow-lg ${section.hoverGlow}`
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {labels[section.id]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-0.5 p-0.5 rounded-full bg-white/10 text-xs">
              {(["sl", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l ? "bg-river-blue text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {l === "sl" ? "SI" : "EN"}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-0.5 p-0.5 rounded-full bg-white/10 text-xs">
              {(["sl", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l ? "bg-river-blue text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {l === "sl" ? "SI" : "EN"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={mobileOpen}
            >
              <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — animated */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-deep-navy/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 flex flex-col gap-1.5">
            {sectionDefs.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? `${section.color} text-white shadow-md`
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {labels[section.id]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
