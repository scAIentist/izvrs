"use client";

import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("../components/Gallery"), {
  ssr: false,
  loading: () => (
    <section className="min-h-screen bg-sage-green-light/20 flex items-center justify-center">
      <p className="text-slate-dark/40">Nalaganje galerije...</p>
    </section>
  ),
});

export default function GalerijaPage() {
  return (
    <main>
      <Gallery />
    </main>
  );
}
