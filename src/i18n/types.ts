export const supportedLanguages = ["ru", "en"] as const;

export type Language = (typeof supportedLanguages)[number];
