import { z } from "zod";

export const step1Schema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters").max(80),
    employeeId: z.string().min(2, "Employee ID is required").max(20),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit number").optional().or(z.literal("")),
    department: z.string().min(1, "Please select a department"),
});

export const step2Schema = z.object({
    category: z.string().min(1, "Please select a category"),
    subject: z.string().min(5, "Subject must be at least 5 characters").max(120),
    description: z.string().min(30, "Provide at least 30 characters").max(2000),
    priority: z.string().min(1, "Select a priority level"),
    incidentDate: z.string().min(1, "Please select the incident date"),
    against: z.string().optional(),
});

export const step3Schema = z.object({
    hasDocuments: z.string().min(1, "Please select yes or no"),
    documentDesc: z.string().optional(),
    witnesses: z.string().optional(),
    previouslyReported: z.string().min(1, "Please select yes or no"),
    previousDetails: z.string().optional(),
    desiredOutcome: z.string().min(10, "Please describe your desired outcome").max(500),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type FullDraft = Partial<Step1Data & Step2Data & Step3Data & { _savedAt: string }>;


