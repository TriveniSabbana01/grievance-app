import type { FullDraft } from "./schemas";
const KEY = "gp_draft";
export const saveDraft = (d: FullDraft) => typeof window !== "undefined" && localStorage.setItem(KEY, JSON.stringify({ ...d, _savedAt: new Date().toISOString() }));
export const loadDraft = (): FullDraft => { try { return typeof window !== "undefined" ? JSON.parse(localStorage.getItem(KEY) || "{}") : {}; } catch { return {}; } };
export const clearDraft = () => typeof window !== "undefined" && localStorage.removeItem(KEY);
