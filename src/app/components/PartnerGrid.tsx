"use client";

import { partners } from "../data/partners";

export default function PartnerGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners.map((partner) => (
        <div
          key={partner.id}
          className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-dark/5"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-river-blue/10 text-river-blue font-bold text-sm flex-shrink-0">
              {partner.countryCode}
            </span>
            <div className="min-w-0">
              <h4 className="font-medium text-deep-navy text-sm leading-tight">
                {partner.name}
              </h4>
              <p className="text-xs text-slate-dark/50 mt-1">
                {partner.country}
                {partner.role && (
                  <span className="ml-2 inline-block bg-amber/15 text-amber px-2 py-0.5 rounded-full text-[10px] font-medium">
                    {partner.role}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
