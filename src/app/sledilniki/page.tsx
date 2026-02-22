"use client";

import dynamic from "next/dynamic";

const TrackerMap = dynamic(() => import("../components/TrackerMap"), {
  ssr: false,
  loading: () => (
    <section className="min-h-screen bg-deep-navy flex items-center justify-center">
      <p className="text-white/40">Nalaganje zemljevida...</p>
    </section>
  ),
});

export default function SledilnikiPage() {
  return (
    <main>
      <TrackerMap />
    </main>
  );
}
