"use server";
import { step1Schema, step2Schema, step3Schema } from "@/lib/schemas";

export type SubmitResult = { success: true; referenceId: string } | { success: false; error: string };

export async function submitGrievance(data: unknown): Promise<SubmitResult> {
    try {
        const d = data as Record<string, unknown>;
        const r1 = step1Schema.safeParse(d);
        if (!r1.success) return { success: false, error: r1.error.issues[0].message };
        const r2 = step2Schema.safeParse(d);
        if (!r2.success) return { success: false, error: r2.error.issues[0].message };
        const r3 = step3Schema.safeParse(d);
        if (!r3.success) return { success: false, error: r3.error.issues[0].message };
        await new Promise((r) => setTimeout(r, 1200));
        return { success: true, referenceId: "GRV-" + Date.now().toString(36).toUpperCase().slice(-8) };
    } catch {
        return { success: false, error: "Unexpected error. Please try again." };
    }
}
