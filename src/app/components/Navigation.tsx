"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const sections = [
  { id: "domov", label: "Domov", color: "bg-river-blue", hoverGlow: "hover:shadow-river-blue/30" },
  { id: "sledilci", label: "GPS Sledilci", color: "bg-forest-green", hoverGlow: "hover:shadow-forest-green/30" },
  { id: "galerija", label: "Galerija", color: "bg-amber", hoverGlow: "hover:shadow-amber/30" },
  { id: "igra", label: "Igra", color: "bg-danger", hoverGlow: "hover:shadow-danger/30" },
  { id: "o-projektu", label: "O projektu", color: "bg-river-blue-dark", hoverGlow: "hover:shadow-river-blue-dark/30" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("domov");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

    for (const section of sections) {
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

          {/* Desktop tabs — pill container */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? `${section.color} text-white shadow-lg ${section.hoverGlow}`
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? "Zapri meni" : "Odpri meni"}
            aria-expanded={mobileOpen}
          >
            <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu — animated */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-deep-navy/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 flex flex-col gap-1.5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? `${section.color} text-white shadow-md`
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
