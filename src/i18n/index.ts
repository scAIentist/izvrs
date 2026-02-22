"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { sl, type Translations } from "./sl";
import { en } from "./en";
import React from "react";

export type Language = "sl" | "en";
export type { Translations };

const dict: Record<Language, Translations> = { sl, en };

interface LanguageContextValue {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "sl",
  t: sl,
  setLang: () => {},
});

const LS_KEY = "izvrstna-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("sl");

  // Read saved preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved === "en" || saved === "sl") setLangState(saved);
    } catch { /* SSR/quota */ }
  }, []);

  // Update <html lang>, document.title, and meta tags
  useEffect(() => {
    const t = dict[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t.meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t.meta.description);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", t.meta.ogLocale);
  }, [lang]);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem(LS_KEY, newLang); } catch { /* quota */ }
  }, []);

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, t: dict[lang], setLang } },
    children,
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
