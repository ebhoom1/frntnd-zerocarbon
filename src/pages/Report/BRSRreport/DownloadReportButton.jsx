import React from "react";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";
import questionsData from "../../../assets/data/DataSubmission/questions.json"; // Import questions

const DownloadReportButton = () => {
    const userId = useSelector((state) => state.auth.user?.id);
  const handleDownload = async () => {
    try {
      const response = await axios.post("/api/reports/generate", {
        userId,
        questions: questionsData, // Send the questions from frontend
      }, { responseType: "blob" });
console.log("reponse:",response.data)
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `BRSR_Report_${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return <button onClick={handleDownload}>Download Report</button>;
};

export default DownloadReportButton;
