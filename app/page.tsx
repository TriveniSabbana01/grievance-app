import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom color="primary">
        Grievance Submission Portal
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome! Please submit your grievance using the form.
      </Typography>

      <Link href="/grievance" passHref>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit Grievance
        </Button>
      </Link>
    </Box>
  );
}