"use client";
import React, { useState } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";

// ── Steps config ─────────────────────────────────────────────────────────────
export const STEPS = [
    { num: 1, label: "Personal Info" },
    { num: 2, label: "Grievance Details" },
    { num: 3, label: "Supporting Info" },
    { num: 4, label: "Review & Submit" },
];

// ── Page Shell ────────────────────────────────────────────────────────────────
export function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: "100vh", position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
            {/* Top accent bar */}
            <div style={{ height: 3, background: "linear-gradient(90deg,#2dd4bf,#34d399 35%,#60a5fa 65%,#a78bfa)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }} />

            {/* Header */}
            <header style={{
                position: "fixed", top: 3, left: 0, right: 0, zIndex: 100,
                borderBottom: "1px solid var(--border)",
                background: "rgba(7,9,15,0.85)", backdropFilter: "blur(20px)",
                padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 9,
                        background: "linear-gradient(135deg,#2dd4bf,#34d399)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 15, color: "#07090f", fontFamily: "var(--fd)",
                    }}>G</div>
                    <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 15, color: "var(--text)", letterSpacing: "0.01em" }}>
                        Grievance Portal
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--success)", boxShadow: "0 0 7px var(--success)" }} />
                    <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--fd)" }}>Secure &amp; Confidential</span>
                </div>
            </header>

            <main style={{ flex: 1, paddingTop: 63, paddingBottom: 60, display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 16px 60px" }}>
                {children}
            </main>
        </div>
    );
}

// ── Stepper ───────────────────────────────────────────────────────────────────
export function Stepper({ current }: { current: 1 | 2 | 3 | 4 }) {
    return (
        <div style={{ width: "100%", maxWidth: 680, marginBottom: 36 }}>
            {/* Step numbers row */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                {STEPS.map((s, i) => {
                    const done = s.num < current;
                    const active = s.num === current;
                    return (
                        <React.Fragment key={s.num}>
                            <div style={{
                                width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "var(--fd)", fontWeight: 700, fontSize: 13,
                                transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
                                ...(done ? { background: "var(--teal)", color: "#07090f" }
                                    : active ? { background: "var(--teal-d)", color: "var(--teal)", border: "1.5px solid var(--teal)", animation: "glow 2.5s infinite" }
                                        : { background: "rgba(255,255,255,0.05)", color: "var(--hint)", border: "1px solid var(--border2)" }),
                            }}>
                                {done
                                    ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5l3.5 3.5 6.5-7" stroke="#07090f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    : s.num}
                            </div>
                            {i < STEPS.length - 1 && (
                                <div style={{
                                    flex: 1, height: 2, margin: "0 6px",
                                    borderRadius: 2,
                                    background: done
                                        ? "linear-gradient(90deg,var(--teal),var(--teal-g))"
                                        : "var(--border2)",
                                    transition: "background 0.4s",
                                }} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
            {/* Labels row */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {STEPS.map((s) => {
                    const done = s.num < current;
                    const active = s.num === current;
                    return (
                        <span key={s.num} style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                            textTransform: "uppercase", textAlign: "center",
                            width: 38, lineHeight: 1.3,
                            color: active ? "var(--teal)" : done ? "var(--muted)" : "var(--hint)",
                            fontFamily: "var(--fd)",
                        }}>{s.label}</span>
                    );
                })}
            </div>
        </div>
    );
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
    return (
        <div style={{
            width: "100%", maxWidth: wide ? 720 : 620,
            background: "var(--surface)",
            border: "1px solid var(--border2)",
            borderRadius: 24, padding: "44px 40px",
            backdropFilter: "blur(24px)",
        }}>
            {children}
        </div>
    );
}

// ── Step header ───────────────────────────────────────────────────────────────
export function StepHeader({ num, title, sub }: { num: string; title: string; sub: string }) {
    return (
        <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                    background: "var(--teal-d)", border: "1px solid rgba(45,212,191,0.25)",
                    borderRadius: 10, padding: "6px 14px",
                    fontFamily: "var(--fd)", fontSize: 11, fontWeight: 700,
                    color: "var(--teal)", letterSpacing: "0.12em", textTransform: "uppercase",
                }}>{num}</div>
            </div>
            <h1 className="aFadeUp" style={{
                fontFamily: "var(--fs)", fontSize: 30, fontWeight: 400,
                color: "var(--text)", margin: "0 0 10px", lineHeight: 1.2,
                letterSpacing: "-0.01em", fontStyle: "italic",
            }}>{title}</h1>
            <p className="aFadeUp d1" style={{
                fontFamily: "var(--fd)", fontSize: 14,
                color: "var(--muted)", margin: 0, lineHeight: 1.7,
            }}>{sub}</p>
        </div>
    );
}

// ── Section divider ───────────────────────────────────────────────────────────
export function SectionLabel({ label }: { label: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 18px" }}>
            <span style={{
                fontFamily: "var(--fd)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.12em", color: "var(--teal)", textTransform: "uppercase",
            }}>{label}</span>
            <div style={{ flex: 1, height: 1, background: "var(--border2)" }} />
        </div>
    );
}

// ── Draft saved toast ─────────────────────────────────────────────────────────
export function SavedToast({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <div style={{
            position: "fixed", bottom: 32, right: 32, zIndex: 300,
            background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.3)",
            borderRadius: 12, padding: "12px 20px",
            display: "flex", alignItems: "center", gap: 10,
            animation: "savePop 2.5s ease forwards",
        }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8l4 4 8-8" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: "var(--fd)", fontSize: 13, color: "var(--teal)", fontWeight: 600 }}>Draft saved</span>
        </div>
    );
}

// ── Draft restored banner ─────────────────────────────────────────────────────
export function DraftBanner({ savedAt, onDiscard }: { savedAt: string; onDiscard: () => void }) {
    const fmt = new Date(savedAt).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" });
    return (
        <div className="aFadeIn" style={{
            background: "var(--gold-d)", border: "1px solid rgba(245,158,11,0.22)",
            borderRadius: 12, padding: "11px 16px", marginBottom: 28,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 7px var(--gold)", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--fd)" }}>
                    Draft restored from <strong style={{ color: "var(--gold)" }}>{fmt}</strong>
                </span>
            </div>
            <button onClick={onDiscard} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--hint)", fontFamily: "var(--fd)", padding: "2px 8px", borderRadius: 6 }}>
                Discard
            </button>
        </div>
    );
}

// ── GField (MUI TextField wrapper) ───────────────────────────────────────────
export function GField({
    label, value, onChange, onBlur, error, helperText,
    placeholder, type = "text", multiline = false,
    rows = 4, maxLength, required = false,
}: {
    label: string; value: string; onChange: (v: string) => void;
    onBlur?: () => void; error?: string; helperText?: string;
    placeholder?: string; type?: string; multiline?: boolean;
    rows?: number; maxLength?: number; required?: boolean;
}) {
    const helpMsg = error || (maxLength && !error ? `${value.length}/${maxLength}` : helperText);
    return (
        <TextField
            label={label} variant="outlined" fullWidth required={required}
            type={type} value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur} placeholder={placeholder}
            multiline={multiline} rows={multiline ? rows : undefined}
            inputProps={{ maxLength }}
            error={!!error} helperText={helpMsg}
            sx={{
                mb: 2.5,
                "& .MuiFormHelperText-root": {
                    color: error ? "var(--danger) !important" : "var(--hint) !important",
                    textAlign: maxLength && !error ? "right" : "left",
                },
            }}
        />
    );
}

// ── GSelect ───────────────────────────────────────────────────────────────────
export function GSelect({ label, value, onChange, options, error, required = false }: {
    label: string; value: string; onChange: (v: string) => void;
    options: { value: string; label: string }[];
    error?: string; required?: boolean;
}) {
    return (
        <FormControl fullWidth error={!!error} sx={{ mb: 2.5 }}>
            <InputLabel>{label}{required ? " *" : ""}</InputLabel>
            <Select
                value={value} label={label + (required ? " *" : "")}
                onChange={(e) => onChange(e.target.value)}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            background: "#111827", border: "1px solid var(--border2)",
                            borderRadius: "10px", color: "var(--text)",
                            "& .MuiMenuItem-root:hover": { background: "var(--teal-d)" },
                            "& .MuiMenuItem-root.Mui-selected": { background: "rgba(45,212,191,0.12)", color: "var(--teal)" },
                        }
                    }
                }}
            >
                {options.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
            {error && <FormHelperText sx={{ color: "var(--danger) !important" }}>{error}</FormHelperText>}
        </FormControl>
    );
}

// ── Priority picker ───────────────────────────────────────────────────────────
const PRIOS = [
    { v: "low", label: "Low", desc: "Not urgent", color: "#34d399", bg: "rgba(52,211,153,0.09)" },
    { v: "medium", label: "Medium", desc: "Needs attention", color: "#f59e0b", bg: "rgba(245,158,11,0.09)" },
    { v: "high", label: "High", desc: "Urgent", color: "#f87171", bg: "rgba(248,113,113,0.09)" },
];
export function PriorityPicker({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
    return (
        <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--fd)" }}>
                Priority Level *
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {PRIOS.map((p) => {
                    const on = value === p.v;
                    return (
                        <button key={p.v} onClick={() => onChange(p.v)} style={{
                            background: on ? p.bg : "rgba(255,255,255,0.03)",
                            border: `1.5px solid ${on ? p.color : "var(--border2)"}`,
                            borderRadius: 12, padding: "14px 12px", cursor: "pointer", textAlign: "left",
                            transition: "all 0.22s", transform: on ? "translateY(-2px)" : "none",
                            boxShadow: on ? `0 6px 20px ${p.color}22` : "none",
                        }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, marginBottom: 8, boxShadow: on ? `0 0 9px ${p.color}` : "none" }} />
                            <div style={{ fontFamily: "var(--fd)", fontSize: 13, fontWeight: 700, color: on ? p.color : "var(--muted)", marginBottom: 3 }}>{p.label}</div>
                            <div style={{ fontFamily: "var(--fd)", fontSize: 11, color: "var(--hint)", lineHeight: 1.4 }}>{p.desc}</div>
                        </button>
                    );
                })}
            </div>
            {error && <span style={{ fontSize: 11, color: "var(--danger)", display: "block", marginTop: 6, fontFamily: "var(--fd)" }}>{error}</span>}
        </div>
    );
}

// ── Yes/No toggle ─────────────────────────────────────────────────────────────
export function YesNoToggle({ label, value, onChange, required }: {
    label: string; value: string; onChange: (v: "yes" | "no") => void; required?: boolean;
}) {
    return (
        <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--fd)" }}>
                {label}{required ? " *" : ""}
            </label>
            <div style={{ display: "flex", gap: 10 }}>
                {(["yes", "no"] as const).map((v) => (
                    <button key={v} onClick={() => onChange(v)} style={{
                        flex: 1, padding: "11px 0", borderRadius: 10, cursor: "pointer",
                        fontFamily: "var(--fd)", fontSize: 14, fontWeight: 600,
                        border: `1.5px solid ${value === v ? "var(--teal)" : "var(--border2)"}`,
                        background: value === v ? "var(--teal-d)" : "rgba(255,255,255,0.03)",
                        color: value === v ? "var(--teal)" : "var(--muted)",
                        transition: "all 0.2s",
                    }}>
                        {v === "yes" ? "Yes" : "No"}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ── Form actions ──────────────────────────────────────────────────────────────
export function FormActions({
    onBack, onNext, onSaveDraft, nextLabel = "Next Step",
    loading = false, showBack = true,
}: {
    onBack?: () => void; onNext: () => void; onSaveDraft?: () => void;
    nextLabel?: string; loading?: boolean; showBack?: boolean;
}) {
    const [nh, setNh] = useState(false);
    const [bh, setBh] = useState(false);
    const [sh, setSh] = useState(false);
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40, gap: 12 }}>
            <div style={{ display: "flex", gap: 10 }}>
                {showBack && (
                    <button
                        onClick={onBack}
                        onMouseEnter={() => setBh(true)} onMouseLeave={() => setBh(false)}
                        style={{
                            background: "transparent", color: bh ? "var(--text)" : "var(--muted)",
                            border: `1px solid ${bh ? "var(--border2)" : "var(--border)"}`,
                            borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 600,
                            cursor: "pointer", fontFamily: "var(--fd)", transition: "all 0.2s",
                        }}>← Back</button>
                )}
                {onSaveDraft && (
                    <button
                        onClick={onSaveDraft}
                        onMouseEnter={() => setSh(true)} onMouseLeave={() => setSh(false)}
                        style={{
                            background: sh ? "var(--gold-d)" : "transparent",
                            color: sh ? "var(--gold)" : "var(--muted)",
                            border: `1px solid ${sh ? "rgba(245,158,11,0.3)" : "var(--border)"}`,
                            borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 600,
                            cursor: "pointer", fontFamily: "var(--fd)", transition: "all 0.2s",
                        }}>Save Draft</button>
                )}
            </div>
            <button
                onClick={onNext} disabled={loading}
                onMouseEnter={() => setNh(true)} onMouseLeave={() => setNh(false)}
                style={{
                    background: "linear-gradient(135deg,#2dd4bf,#34d399)",
                    color: "#07090f", border: "none", borderRadius: 10,
                    padding: "13px 32px", fontSize: 14, fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--fd)",
                    opacity: loading ? 0.7 : 1, transition: "all 0.2s",
                    transform: nh && !loading ? "translateY(-1px)" : "none",
                    boxShadow: nh && !loading ? "0 8px 28px var(--teal-g)" : "none",
                    display: "flex", alignItems: "center", gap: 8,
                }}>
                {loading ? (
                    <><span style={{ width: 14, height: 14, border: "2px solid rgba(0,0,0,0.25)", borderTopColor: "#07090f", borderRadius: "50%", animation: "spin .7s linear infinite", display: "inline-block" }} />Processing…</>
                ) : nextLabel}
            </button>
        </div>
    );
}

// ── Review row ────────────────────────────────────────────────────────────────
export function ReviewRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 16, padding: "13px 0", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "var(--fd)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--hint)", textTransform: "uppercase", paddingTop: 2 }}>{label}</span>
            <span style={{ fontFamily: "var(--fd)", fontSize: 14, color: highlight ? "var(--teal)" : "var(--text)", lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{value || "—"}</span>
        </div>
    );
}

// ── Review section card ───────────────────────────────────────────────────────
export function ReviewSection({ title, accent, children }: { title: string; accent?: string; children: React.ReactNode }) {
    return (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 16, padding: "20px 24px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent || "var(--teal)" }} />
                <p style={{ fontFamily: "var(--fd)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: accent || "var(--teal)", textTransform: "uppercase", margin: 0 }}>{title}</p>
            </div>
            {children}
        </div>
    );
}
