"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { step1Schema } from "@/lib/schemas";
import { saveDraft, loadDraft, clearDraft } from "@/lib/draft";
import { PageShell, Stepper, Card, StepHeader, SectionLabel, DraftBanner, SavedToast, GField, GSelect, FormActions } from "@/components/ui";

const DEPTS = [
    { value: "hr", label: "Human Resources" },
    { value: "finance", label: "Finance & Payroll" },
    { value: "it", label: "IT & Systems" },
    { value: "operations", label: "Operations" },
    { value: "admin", label: "Administration" },
    { value: "legal", label: "Legal & Compliance" },
    { value: "engineering", label: "Engineering" },
    { value: "sales", label: "Sales & Marketing" },
    { value: "other", label: "Other" },
];

type E = Partial<Record<"fullName" | "employeeId" | "email" | "phone" | "department", string>>;

export default function Step1() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [errors, setErrors] = useState<E>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [draftAt, setDraftAt] = useState<string | null>(null);
    const [toast, setToast] = useState(false);

    useEffect(() => {
        const d = loadDraft();
        if (d.fullName) setFullName(d.fullName);
        if (d.employeeId) setEmployeeId(d.employeeId);
        if (d.email) setEmail(d.email);
        if (d.phone) setPhone(d.phone ?? "");
        if (d.department) setDepartment(d.department);
        if ((d as any)._savedAt) setDraftAt((d as any)._savedAt);
    }, []);

    const validate = () => {
        const r = step1Schema.safeParse({ fullName, employeeId, email, phone: phone || undefined, department });
        if (r.success) return {};
        return Object.fromEntries(r.error.issues.map(i => [i.path[0], i.message])) as E;
    };

    const blur = (f: string) => { setTouched(t => ({ ...t, [f]: true })); setErrors(validate()); };

    const handleSave = () => {
        saveDraft({ fullName, employeeId, email, phone, department });
        setToast(true); setTimeout(() => setToast(false), 2600);
    };

    const handleNext = () => {
        setTouched({ fullName: true, employeeId: true, email: true, phone: true, department: true });
        const e = validate(); setErrors(e);
        if (Object.keys(e).length) return;
        saveDraft({ fullName, employeeId, email, phone, department });
        router.push("/grievance/step2");
    };

    return (
        <PageShell>
            <Stepper current={1} />
            <Card>
                {draftAt && <DraftBanner savedAt={draftAt} onDiscard={() => { clearDraft(); setFullName(""); setEmployeeId(""); setEmail(""); setPhone(""); setDepartment(""); setDraftAt(null); }} />}
                <StepHeader num="Step 1 of 4" title="Personal Information" sub="Please provide your personal details so we can process your grievance." />
                <SectionLabel label="Identity" />
                <div className="aFadeUp d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                    <GField label="Full Name" value={fullName} onChange={setFullName} onBlur={() => blur("fullName")} error={touched.fullName ? errors.fullName : undefined} placeholder="e.g. Ravi Kumar" required maxLength={80} />
                    <GField label="Employee ID" value={employeeId} onChange={setEmployeeId} onBlur={() => blur("employeeId")} error={touched.employeeId ? errors.employeeId : undefined} placeholder="e.g. EMP-1042" required maxLength={20} />
                </div>
                <SectionLabel label="Contact Details" />
                <div className="aFadeUp d3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                    <GField label="Email Address" value={email} onChange={setEmail} onBlur={() => blur("email")} error={touched.email ? errors.email : undefined} placeholder="ravi@company.com" type="email" required helperText="Confirmation sent here" />
                    <GField label="Phone Number" value={phone} onChange={setPhone} onBlur={() => blur("phone")} error={touched.phone ? errors.phone : undefined} placeholder="9876543210" type="tel" maxLength={10} />
                </div>
                <div className="aFadeUp d4">
                    <GSelect label="Department" value={department} onChange={v => { setDepartment(v); blur("department"); }} options={DEPTS} error={touched.department ? errors.department : undefined} required />
                </div>
                <FormActions onNext={handleNext} onSaveDraft={handleSave} nextLabel="Next Step" showBack={false} />
            </Card>
            <SavedToast show={toast} />
        </PageShell>
    );
}
