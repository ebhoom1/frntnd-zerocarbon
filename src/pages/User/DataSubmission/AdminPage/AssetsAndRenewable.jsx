import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserTableList from "../../../../components/Admin/userList/UserList";
import axios from "../../../../api/axios";
import assetsQuestions from "../../../../assets/data/DataSubmission/assets&renewable.json";

const AssetsAndRenewable = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleUserSelect = async (userId, companyName) => {
    console.log("Selecteduserid:", userId);
    setSelectedUserId(userId);
    setSelectedCompanyName(companyName);
    setLoading(true);
  
    try {
      const res = await axios.get(`/api/submissions/${userId}`);
      setSubmissionData(res.data.responses);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert("No submission found for this user.");
      } else {
        alert("Error fetching submission data.");
      }
      setSubmissionData(null);
    }
    setLoading(false);
  };


  const renderAnswers = (category, sectionKey, prefix) => {
    const questions = assetsQuestions[category]?.[sectionKey];
    const responses = submissionData?.[`${category.replace(/\s/g, "")}_${sectionKey.replace(/\s/g, "")}`];
    if (!questions || !responses || responses.length === 0) return <Typography>No Data Available</Typography>;

    return responses.map((entry, idx) => (
      <Box key={idx} p={2} sx={{ border: "1px solid #ccc", borderRadius: 2, mb: 2 }}>
        {questions.map((q, qIdx) => {
          const key = `${prefix}_Q${qIdx + 1}`;
          const value = entry[key] ?? "Not Available";
          return (
            <Typography key={qIdx} sx={{ mb: 1 }}>
              <strong>{q.question}:</strong> {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
            </Typography>
          );
        })}
      </Box>
    ));
  };

  return (
    <Box sx={{ p: 4 }}>
      <UserTableList title="Select User" onUserSelect={handleUserSelect} />
      {selectedUserId && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#2e7d32" }}>
            Assets & Renewable Projects - {selectedCompanyName}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {/* ASSETS SECTIONS */}
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Assets
              </Typography>
              {Object.keys(assetsQuestions["Assets"]).map((section, idx) => (
                <Accordion
                  expanded={expanded === section}
                  onChange={handleAccordionChange(section)}
                  key={idx}
                  sx={{ mb: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{section}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {renderAnswers("Assets", section, section.replace(/\s/g, ""))}
                  </AccordionDetails>
                </Accordion>
              ))}

              {/* RENEWABLE PROJECT SECTIONS */}
              <Typography variant="h6" fontWeight="bold" sx={{ my: 3 }}>
                Renewable Projects
              </Typography>
              {Object.keys(assetsQuestions["Renewable Project"]).map((section, idx) => (
                <Accordion
                  expanded={expanded === section}
                  onChange={handleAccordionChange(section)}
                  key={idx}
                  sx={{ mb: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{section}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {renderAnswers("Renewable Project", section, section.replace(/\s/g, ""))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AssetsAndRenewable;
