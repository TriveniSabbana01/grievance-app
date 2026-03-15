"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { step2Schema } from "@/lib/schemas";
import { saveDraft, loadDraft } from "@/lib/draft";
import { PageShell, Stepper, Card, StepHeader, SectionLabel, SavedToast, GField, GSelect, PriorityPicker, FormActions } from "@/components/ui";

const CATS = [
    { value: "salary", label: "Salary & Compensation" },
    { value: "harassment", label: "Workplace Harassment" },
    { value: "discrimination", label: "Discrimination" },
    { value: "workload", label: "Excessive Workload" },
    { value: "policy", label: "Policy Violation" },
    { value: "leave", label: "Leave & Attendance" },
    { value: "promotion", label: "Promotion & Appraisal" },
    { value: "safety", label: "Health & Safety" },
    { value: "facilities", label: "Facilities & Infrastructure" },
    { value: "other", label: "Other" },
];

type E = Partial<Record<"category" | "subject" | "description" | "priority" | "incidentDate", string>>;

export default function Step2() {
    const router = useRouter();
    const [category, setCategory] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high" | "">("");
    const [incidentDate, setIncidentDate] = useState("");
    const [against, setAgainst] = useState("");
    const [errors, setErrors] = useState<E>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [toast, setToast] = useState(false);

    useEffect(() => {
        const d = loadDraft();
        if (d.category) setCategory(d.category);
        if (d.subject) setSubject(d.subject);
        if (d.description) setDescription(d.description);
        if (d.priority) setPriority(d.priority as "low" | "medium" | "high");
        if (d.incidentDate) setIncidentDate(d.incidentDate);
        if (d.against) setAgainst(d.against ?? "");
    }, []);

    useEffect(() => {
        const d = loadDraft();
        saveDraft({ ...d, category, subject, description, priority: priority || undefined, incidentDate, against });
    }, [category, subject, description, priority, incidentDate, against]);

    const validate = () => {
        const r = step2Schema.safeParse({ category, subject, description, priority, incidentDate, against });
        if (r.success) return {};
        return Object.fromEntries(r.error.issues.map(i => [i.path[0], i.message])) as E;
    };

    const blur = (f: string) => { setTouched(t => ({ ...t, [f]: true })); setErrors(validate()); };

    const handleNext = () => {
        setTouched({ category: true, subject: true, description: true, priority: true, incidentDate: true });
        const e = validate(); setErrors(e);
        if (Object.keys(e).length) return;
        router.push("/grievance/step3");
    };

    return (
        <PageShell>
            <Stepper current={2} />
            <Card>
                <StepHeader num="Step 2 of 4" title="Grievance Details" sub="Describe your complaint in detail. All information is kept strictly confidential." />
                <SectionLabel label="Classification" />
                <div className="aFadeUp d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                    <GSelect label="Category" value={category} onChange={v => { setCategory(v); blur("category"); }} options={CATS} error={touched.category ? errors.category : undefined} required />
                    <GField label="Incident Date" value={incidentDate} onChange={setIncidentDate} onBlur={() => blur("incidentDate")} error={touched.incidentDate ? errors.incidentDate : undefined} type="date" required />
                </div>
                <SectionLabel label="Complaint" />
                <div className="aFadeUp d3">
                    <GField label="Subject" value={subject} onChange={setSubject} onBlur={() => blur("subject")} error={touched.subject ? errors.subject : undefined} placeholder="Brief one-line summary of the issue" required maxLength={120} />
                    <GField label="Full Description" value={description} onChange={setDescription} onBlur={() => blur("description")} error={touched.description ? errors.description : undefined} placeholder="Describe what happened, when, who was involved, and the impact." multiline rows={6} required maxLength={2000} />
                </div>
                <SectionLabel label="Additional Context" />
                <div className="aFadeUp d4">
                    <GField label="Complaint Against (optional)" value={against} onChange={setAgainst} placeholder="Name / role of person(s) involved, if applicable" maxLength={120} />
                    <PriorityPicker value={priority} onChange={(v) => { setPriority(v as "low" | "medium" | "high"); blur("priority"); }} error={touched.priority ? errors.priority : undefined} />
                </div>
                <FormActions onBack={() => router.push("/grievance/step1")} onNext={handleNext} onSaveDraft={() => { setToast(true); setTimeout(() => setToast(false), 2600); }} nextLabel="Next Step" />
            </Card>
            <SavedToast show={toast} />
        </PageShell>
    );
}