"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadDraft, clearDraft } from "@/lib/draft";
import { submitGrievance } from "@/app/actions/submit";
import { PageShell, Stepper, Card, StepHeader, ReviewSection, ReviewRow, FormActions } from "@/components/ui";

const PRIORITY_LABEL: Record<string, string> = {
    low: "Low — Not urgent", medium: "Medium — Needs attention", high: "High — Urgent",
};

export default function Step4() {
    const router = useRouter();
    const [data, setData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [refId, setRefId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => { setData(loadDraft() as Record<string, string>); }, []);

    const handleSubmit = async () => {
        setLoading(true); setError("");
        const res = await submitGrievance(data);
        setLoading(false);
        if (res.success) { clearDraft(); setRefId(res.referenceId); setSubmitted(true); }
        else setError(res.error);
    };

    // ── Success ────────────────────────────────────────────────────────────────
    if (submitted) return (
        <PageShell>
            <Card wide>
                <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
                    {/* Circle */}
                    <div className="aScaleIn" style={{ width: 84, height: 84, borderRadius: "50%", background: "rgba(52,211,153,0.10)", border: "2px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <path d="M8 19l7 7 15-15" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="50" strokeDashoffset="50" style={{ animation: "checkDraw .6s .2s cubic-bezier(.16,1,.3,1) forwards" }} />
                        </svg>
                    </div>
                    <p className="aFadeUp d1" style={{ fontFamily: "var(--fd)", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--success)", textTransform: "uppercase", marginBottom: 10 }}>Complaint Received</p>
                    <h1 className="aFadeUp d2" style={{ fontFamily: "var(--fs)", fontSize: 32, fontWeight: 400, color: "var(--text)", margin: "0 0 12px", fontStyle: "italic", letterSpacing: "-0.01em" }}>Successfully Submitted</h1>
                    <p className="aFadeUp d3" style={{ fontFamily: "var(--fd)", fontSize: 14, color: "var(--muted)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
                        Your grievance has been securely recorded. A confirmation will be sent to <strong style={{ color: "var(--text)" }}>{data.email}</strong>.
                    </p>

                    {/* Ref ID */}
                    <div className="aFadeUp d4" style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 16, padding: "20px 28px", marginBottom: 32, display: "inline-block", minWidth: 320 }}>
                        <p style={{ fontFamily: "var(--fd)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--hint)", textTransform: "uppercase", marginBottom: 8 }}>Your Reference ID</p>
                        <p style={{ fontFamily: "'Plus Jakarta Sans',monospace", fontSize: 26, fontWeight: 800, color: "var(--success)", margin: "0 0 6px", letterSpacing: "0.04em" }}>{refId}</p>
                        <p style={{ fontFamily: "var(--fd)", fontSize: 11, color: "var(--hint)", margin: 0 }}>Keep this safe to track your complaint status</p>
                    </div>

                    {/* Timeline */}
                    <div className="aFadeUp d5" style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 16, padding: "22px 28px", marginBottom: 32, textAlign: "left" }}>
                        <p style={{ fontFamily: "var(--fd)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 18 }}>What happens next</p>
                        {[
                            ["Within 24 hours", "HR acknowledges receipt and assigns a case officer"],
                            ["Within 3 working days", "Investigation begins and preliminary review is conducted"],
                            ["Within 10 working days", "Resolution communicated to you by email"],
                        ].map(([time, action], i) => (
                            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: i < 2 ? 14 : 0, borderBottom: i < 2 ? "1px solid var(--border)" : "none", marginBottom: i < 2 ? 14 : 0 }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", flexShrink: 0, marginTop: 5, boxShadow: "0 0 6px var(--teal)" }} />
                                <div>
                                    <span style={{ fontFamily: "var(--fd)", fontSize: 12, fontWeight: 700, color: "var(--teal)" }}>{time}</span>
                                    <p style={{ fontFamily: "var(--fd)", fontSize: 13, color: "var(--muted)", margin: "3px 0 0" }}>{action}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => router.push("/grievance/step1")} style={{ background: "transparent", color: "var(--muted)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--fd)", transition: "all .2s" }}>
                        Submit Another Grievance
                    </button>
                </div>
            </Card>
        </PageShell>
    );

    // ── Review ─────────────────────────────────────────────────────────────────
    return (
        <PageShell>
            <Stepper current={4} />
            <Card wide>
                <StepHeader num="Step 4 of 4" title="Review & Submit" sub="Please verify all details carefully. You can go back to edit before submitting." />

                {error && (
                    <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 12, padding: "12px 18px", marginBottom: 24, fontSize: 13, color: "var(--danger)", fontFamily: "var(--fd)" }}>
                        {error}
                    </div>
                )}

                <ReviewSection title="Personal Information">
                    <ReviewRow label="Full Name" value={data.fullName} />
                    <ReviewRow label="Employee ID" value={data.employeeId} />
                    <ReviewRow label="Email" value={data.email} />
                    <ReviewRow label="Phone" value={data.phone || "Not provided"} />
                    <ReviewRow label="Department" value={data.department} />
                </ReviewSection>

                <ReviewSection title="Grievance Details" accent="var(--gold)">
                    <ReviewRow label="Category" value={data.category} />
                    <ReviewRow label="Subject" value={data.subject} />
                    <ReviewRow label="Description" value={data.description} />
                    <ReviewRow label="Against" value={data.against || "Not specified"} />
                    <ReviewRow label="Priority" value={PRIORITY_LABEL[data.priority] || data.priority} highlight={data.priority === "high"} />
                    <ReviewRow label="Incident Date" value={data.incidentDate} />
                </ReviewSection>

                <ReviewSection title="Supporting Information" accent="var(--info)">
                    <ReviewRow label="Has Documents" value={data.hasDocuments === "yes" ? "Yes" : "No"} />
                    {data.hasDocuments === "yes" && <ReviewRow label="Documents" value={data.documentDesc || "—"} />}
                    <ReviewRow label="Witnesses" value={data.witnesses || "None mentioned"} />
                    <ReviewRow label="Prev. Reported" value={data.previouslyReported === "yes" ? "Yes" : "No"} />
                    {data.previouslyReported === "yes" && <ReviewRow label="Prev. Details" value={data.previousDetails || "—"} />}
                    <ReviewRow label="Desired Outcome" value={data.desiredOutcome} />
                </ReviewSection>

                <p style={{ fontFamily: "var(--fd)", fontSize: 12, color: "var(--hint)", lineHeight: 1.75, padding: "16px 0 4px" }}>
                    By submitting, you confirm this information is accurate to the best of your knowledge. Your complaint will be kept confidential and handled in accordance with our grievance redressal policy.
                </p>

                <FormActions
                    onBack={() => router.push("/grievance/step3")}
                    onNext={handleSubmit}
                    nextLabel="Submit Grievance →"
                    loading={loading}
                />
            </Card>
        </PageShell>
    );
}
