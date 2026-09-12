import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { storageKeys } from "../constants";

import { resources } from "./resources";
import { type Language, supportedLanguages } from "./types";

function getStoredLanguage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(storageKeys.language);
  } catch {
    return null;
  }
}

const storedLanguage = getStoredLanguage();
const initialLanguage: Language = supportedLanguages.includes(storedLanguage as Language)
  ? (storedLanguage as Language)
  : "ru";

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export { resources } from "./resources";
export type { Language } from "./types";
export { supportedLanguages } from "./types";
export default i18n;
