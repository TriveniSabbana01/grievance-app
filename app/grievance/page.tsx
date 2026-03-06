"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

export default function Step1() {
    const router = useRouter();
    const [name, setName] = useState(() => typeof window !== "undefined" ? localStorage.getItem("name") || "" : "");
    const [email, setEmail] = useState(() => typeof window !== "undefined" ? localStorage.getItem("email") || "" : "");
    const [error, setError] = useState("");

    const handleNext = () => {
        if (!name || !email) {
            setError("Please fill in all fields");
            return;
        }
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        router.push("/grievance/step2");
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>Step 1: Personal Info</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
        </Box>
    );
}