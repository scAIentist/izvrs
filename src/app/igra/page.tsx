"use client";

import dynamic from "next/dynamic";

const RiverGame = dynamic(() => import("../components/RiverGame"), {
  ssr: false,
  loading: () => (
    <section className="min-h-screen bg-deep-navy flex items-center justify-center">
      <p className="text-white/40">Nalaganje igre...</p>
    </section>
  ),
});

export default function IgraPage() {
  return (
    <main>
      <RiverGame />
    </main>
  );
}
