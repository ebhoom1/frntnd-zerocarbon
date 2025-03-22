// import React from "react";
// import axios from "../../../api/axios";
// import { useSelector } from "react-redux";
// import questionsData from "../../../assets/data/DataSubmission/questions.json"; // Import questions

// const DownloadReportButton = () => {
//     const userId = useSelector((state) => state.auth.user?.id);
//   const handleDownload = async () => {
//     try {
//       const response = await axios.post("/api/reports/generate", {
//         userId,
//         questions: questionsData, // Send the questions from frontend
//       }, { responseType: "blob" });
//      console.log("reponse:",response.data)
//       // Create a download link
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `BRSR_Report_${userId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error("Error downloading report:", error);
//     }
//   };

//   return <button onClick={handleDownload}>Download Report</button>;
// };

// export default DownloadReportButton;


import React, { useState } from "react";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";
import questionsData from "../../../assets/data/DataSubmission/questions.json";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  CircularProgress
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const DownloadReportsPage = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [loading, setLoading] = useState(false);

  const handleDownloadBRSR = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/reports/generate",
        {
          userId,
          questions: questionsData,
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `BRSR_Report_${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading BRSR report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
       
        p: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* BRSR Report Card */}
        <Grid item xs={12} sm={5} md={3}>
        <Card sx={{  maxWidth: 200, borderRadius: 5, textAlign: "center", boxShadow: 6, mx: "auto" }}>
            <CardContent>
              <img
                src="/pdf.png"
                alt="BRSR Report"
                style={{ width: "100%", margin: "auto" }}
              />
             <Typography variant="h6" mt={2} mb={2}>
                BRSR Report
              </Typography>
              <Button
                variant="contained"
                color="primary"
                // startIcon={<FileDownloadIcon />}
                onClick={handleDownloadBRSR}
                disabled={loading}
                fullWidth
                sx={{ borderRadius: 10, fontWeight: "bold"}}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Download BRSR"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* GRI Report Card - Display Only */}
        <Grid item xs={12} sm={5} md={3}>
        <Card sx={{  maxWidth: 200, borderRadius: 5, textAlign: "center", boxShadow: 6, mx: "auto" }}>
            <CardContent>
              <img
                src="/pdf.png"
                alt="GRI Report"
                style={{ width: "100%", maxWidth: "200px", margin: "auto" }}
              />
              <Typography variant="h6" mt={2} mb={2}>
                GRI Report
              </Typography>
              <Button
                variant="contained"
                color="primary"
                // startIcon={<FileDownloadIcon />}
                // onClick={handleDownloadBRSR}
                fullWidth
                sx={{ borderRadius: 10, fontWeight: "bold"}} 
              >
                Download GRI  
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DownloadReportsPage;
