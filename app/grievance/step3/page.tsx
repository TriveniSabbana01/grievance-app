"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { step3Schema } from "@/lib/schemas";
import { saveDraft, loadDraft } from "@/lib/draft";
import { PageShell, Stepper, Card, StepHeader, SectionLabel, SavedToast, GField, YesNoToggle, FormActions } from "@/components/ui";

type E = Partial<Record<"hasDocuments" | "previouslyReported" | "desiredOutcome", string>>;

export default function Step3() {
    const router = useRouter();
    const [hasDocuments, setHasDocs] = useState<"yes" | "no" | "">("");
    const [documentDesc, setDocumentDesc] = useState("");
    const [witnesses, setWitnesses] = useState("");
    const [previouslyReported, setPrevReported] = useState<"yes" | "no" | "">("");
    const [previousDetails, setPrevDetails] = useState("");
    const [desiredOutcome, setDesiredOutcome] = useState("");
    const [errors, setErrors] = useState<E>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [toast, setToast] = useState(false);

    useEffect(() => {
        const d = loadDraft();
        if (d.hasDocuments) setHasDocs(d.hasDocuments as "yes" | "no");
        if (d.documentDesc) setDocumentDesc(d.documentDesc ?? "");
        if (d.witnesses) setWitnesses(d.witnesses ?? "");
        if (d.previouslyReported) setPrevReported(d.previouslyReported as "yes" | "no");
        if (d.previousDetails) setPrevDetails(d.previousDetails ?? "");
        if (d.desiredOutcome) setDesiredOutcome(d.desiredOutcome ?? "");
    }, []);

    useEffect(() => {
        const d = loadDraft();
        saveDraft({ ...d, hasDocuments: hasDocuments || undefined, documentDesc, witnesses, previouslyReported: previouslyReported || undefined, previousDetails, desiredOutcome });
    }, [hasDocuments, documentDesc, witnesses, previouslyReported, previousDetails, desiredOutcome]);

    const validate = () => {
        const r = step3Schema.safeParse({ hasDocuments: hasDocuments || undefined, documentDesc, witnesses, previouslyReported: previouslyReported || undefined, previousDetails, desiredOutcome });
        if (r.success) return {};
        return Object.fromEntries(r.error.issues.map(i => [i.path[0], i.message])) as E;
    };

    const blur = (f: string) => { setTouched(t => ({ ...t, [f]: true })); setErrors(validate()); };

    const handleNext = () => {
        setTouched({ hasDocuments: true, previouslyReported: true, desiredOutcome: true });
        const e = validate(); setErrors(e);
        if (Object.keys(e).length) return;
        router.push("/grievance/step4");
    };

    return (
        <PageShell>
            <Stepper current={3} />
            <Card>
                <StepHeader num="Step 3 of 4" title="Supporting Information" sub="Provide any additional evidence or context that can help us investigate your complaint." />

                <SectionLabel label="Evidence & Documents" />
                <div className="aFadeUp d2">
                    <YesNoToggle
                        label="Do you have supporting documents / evidence?"
                        value={hasDocuments}
                        onChange={v => { setHasDocs(v); blur("hasDocuments"); }}
                        required
                    />
                    {hasDocuments === "yes" && (
                        <GField
                            label="Describe your documents"
                            value={documentDesc} onChange={setDocumentDesc}
                            placeholder="e.g. Email screenshots, payslips, CCTV footage — describe what you have"
                            multiline rows={3} maxLength={500}
                            helperText="You can attach files after submission via the provided link"
                        />
                    )}
                </div>

                <SectionLabel label="Witnesses" />
                <div className="aFadeUp d3">
                    <GField
                        label="Witnesses (optional)"
                        value={witnesses} onChange={setWitnesses}
                        placeholder="Names and designations of any witnesses, one per line"
                        multiline rows={3} maxLength={400}
                    />
                </div>

                <SectionLabel label="Prior Reporting" />
                <div className="aFadeUp d4">
                    <YesNoToggle
                        label="Has this been reported previously?"
                        value={previouslyReported}
                        onChange={v => { setPrevReported(v); blur("previouslyReported"); }}
                        required
                    />
                    {previouslyReported === "yes" && (
                        <GField
                            label="Previous report details"
                            value={previousDetails} onChange={setPrevDetails}
                            placeholder="When was it reported, to whom, and what was the outcome?"
                            multiline rows={3} maxLength={500}
                        />
                    )}
                </div>

                <SectionLabel label="Resolution" />
                <div className="aFadeUp d5">
                    <GField
                        label="Desired Outcome *"
                        value={desiredOutcome} onChange={setDesiredOutcome}
                        onBlur={() => blur("desiredOutcome")}
                        error={touched.desiredOutcome ? errors.desiredOutcome : undefined}
                        placeholder="What resolution are you seeking? e.g. Salary disbursement, formal apology, disciplinary action..."
                        multiline rows={4} maxLength={500} required
                    />
                </div>

                <FormActions
                    onBack={() => router.push("/grievance/step2")}
                    onNext={handleNext}
                    onSaveDraft={() => { setToast(true); setTimeout(() => setToast(false), 2600); }}
                    nextLabel="Review & Submit"
                />
            </Card>
            <SavedToast show={toast} />
        </PageShell>
    );
}
