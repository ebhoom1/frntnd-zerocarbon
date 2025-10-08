import React, { useState } from "react";
import axios from "../../../api/axios";
import questionsData from "../../../assets/data/DataSubmission/questions.json"; // Import questions

import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";

const DownloadReportsPage = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [loadingBRSR, setLoadingBRSR] = useState(false);
  const [loadingGRI, setLoadingGRI] = useState(false);
    console.log("userid:", userId);
  const handleDownloadBRSR = async () => {
    try {
      setLoadingBRSR(true)
        const response = await axios.post(
        `/api/reports/generate/${userId}`,
        { questionsMap: questionsData }, // send it in body
        { responseType: "blob" } // Important to handle binary PDF data
      );
      console.log("response:", response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `BRSR_Report_${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading BRSR report:", error);

      // Optional: show alert
      // alert("Failed to download BRSR report. Please try again.");
    } finally {
      setLoadingBRSR(false)    }
  };

  const handleDownloadGRI = async () => {
    try {
      setLoadingGRI(true)
      const response = await axios.get(`/api/griform/export/${userId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `GRI_Report_${userId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading GRI report:", error);
      // Optional: show alert here
    } finally {
      setLoadingGRI(false);
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
          <Card
            sx={{
              maxWidth: 200,
              borderRadius: 5,
              textAlign: "center",
              boxShadow: 6,
              mx: "auto",
            }}
          >
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
                disabled={loadingBRSR}
                fullWidth
                sx={{ borderRadius: 10, fontWeight: "bold" }}
              >
                {loadingBRSR ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Download BRSR"
                )}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* GRI Report Card - Display Only */}
        <Grid item xs={12} sm={5} md={3}>
          <Card
            sx={{
              maxWidth: 200,
              borderRadius: 5,
              textAlign: "center",
              boxShadow: 6,
              mx: "auto",
            }}
          >
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
                onClick={handleDownloadGRI}
                disabled={loadingGRI}
                fullWidth
                sx={{ borderRadius: 10, fontWeight: "bold" }}
              >
                {loadingGRI ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Download GRI"
                )}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DownloadReportsPage;
