"use client";

import dynamic from "next/dynamic";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";

// Lazy-load below-the-fold heavy sections (ssr:false needs "use client")
const TrackerMap = dynamic(() => import("./components/TrackerMap"), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-deep-navy">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="h-[600px] flex items-center justify-center">
          <p className="text-white/40">Nalaganje zemljevida...</p>
        </div>
      </div>
    </section>
  ),
});

const Gallery = dynamic(() => import("./components/Gallery"), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-sage-green-light/20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="h-96 flex items-center justify-center">
          <p className="text-slate-dark/40">Nalaganje galerije...</p>
        </div>
      </div>
    </section>
  ),
});

const RiverGame = dynamic(() => import("./components/RiverGame"), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-deep-navy">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="h-96 flex items-center justify-center">
          <p className="text-white/40">Nalaganje igre...</p>
        </div>
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <TrackerMap />
        <Gallery />
        <RiverGame />
      </main>
      <Footer />
    </>
  );
}
