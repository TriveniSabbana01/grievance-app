"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

export default function Step2() {
    const router = useRouter();

    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    // Load saved draft from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            setSubject(localStorage.getItem("subject") || "");
            setDescription(localStorage.getItem("description") || "");
        }
    }, []);

    const handleNext = () => {
        if (!subject || !description) {
            setError("Please fill in all fields");
            return;
        }
        // Save draft
        localStorage.setItem("subject", subject);
        localStorage.setItem("description", description);

        router.push("/grievance/step3");
    };

    const handleBack = () => {
        router.push("/grievance");
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Step 2: Grievance Details
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                </Button>
            </Box>
        </Box>
    );
}