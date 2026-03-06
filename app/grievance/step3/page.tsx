"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Paper, Alert } from "@mui/material";

export default function Step3() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Load all draft data from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            setName(localStorage.getItem("name") || "");
            setEmail(localStorage.getItem("email") || "");
            setSubject(localStorage.getItem("subject") || "");
            setDescription(localStorage.getItem("description") || "");
        }
    }, []);

    const handleBack = () => {
        router.push("/grievance/step2");
    };

    const handleSubmit = () => {
        // Example server submission placeholder
        // Replace with actual Server Action in Next.js 13+
        setSubmitted(true);

        // Optional: clear localStorage after submission
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("subject");
        localStorage.removeItem("description");
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Step 3: Review & Submit
            </Typography>

            {submitted && <Alert severity="success" sx={{ mb: 2 }}>Grievance submitted successfully!</Alert>}

            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography><strong>Name:</strong> {name}</Typography>
                <Typography><strong>Email:</strong> {email}</Typography>
                <Typography><strong>Subject:</strong> {subject}</Typography>
                <Typography><strong>Description:</strong> {description}</Typography>
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Confirm Submission
                </Button>
            </Box>
        </Box>
    );
}