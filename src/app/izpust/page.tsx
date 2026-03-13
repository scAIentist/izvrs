"use client";

import Link from "next/link";
import Image from "next/image";
import { events } from "../data/events";
import ScrollReveal from "../components/ScrollReveal";
import { useTranslation } from "@/i18n";

export default function IzpustPage() {
  const { t } = useTranslation();

  return (
    <main>
      <section className="pt-28 pb-20 bg-deep-navy min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal playful className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t.events.title}
            </h2>
            <div className="w-16 h-1 bg-river-blue mx-auto rounded-full mt-3" />
            <p className="text-white/60 text-base max-w-2xl mx-auto mt-4">
              {t.events.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <ScrollReveal key={event.slug} delay={0.1}>
                <Link
                  href={`/izpust/${event.slug}`}
                  className="block rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 group"
                >
                  {/* Cover image — first photo from the event */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={event.photos[0].file}
                      alt={`${event.date} — ${event.location}`}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white group-hover:text-river-blue transition-colors">
                      {event.date}
                    </h3>
                    <p className="text-white/50 mt-1">{event.location}</p>
                    <p className="text-white/30 text-sm mt-3">
                      {event.photos.length} {t.events.photos} &middot; {event.videos.length} {t.events.videos}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
