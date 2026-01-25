import type { LandingResponse } from "@/shared/types/landing.types";

const KEY = "cms.landing.v1";
const TTL_MS = 15 * 60 * 1000; // 15 phút (tuỳ bạn)

type CacheShape = {
  savedAt: number;
  value: LandingResponse;
};

export const readLandingCache = (): LandingResponse | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: CacheShape = JSON.parse(raw);

    if (!parsed?.savedAt || !parsed?.value) return null;
    if (Date.now() - parsed.savedAt > TTL_MS) return null;

    return parsed.value;
  } catch {
    return null;
  }
};

export const writeLandingCache = (value: LandingResponse) => {
  if (typeof window === "undefined") return;
  try {
    const payload: CacheShape = { savedAt: Date.now(), value };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
};

export const clearLandingCache = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
};
