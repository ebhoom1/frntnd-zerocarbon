import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../../../../api/axios";
import UserTableList from "../../../../components/Admin/userList/UserList";
import governanceQuestions from "../../../../assets/data/DataSubmission/governance.json";

const GovernancePage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

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


  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderQuestionAnswers = (category, sectionKey, responseKeyPrefix) => {
    const questions = governanceQuestions[category]?.[sectionKey];
    const responses = submissionData?.[`${category.replace(/\s/g, "")}_${sectionKey.replace(/\s/g, "")}`];
    if (!questions || !responses || responses.length === 0) return <Typography>No Data Available</Typography>;

    return responses.map((entry, index) => (
      <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        {questions.map((q, idx) => {
          const responseKey = `${responseKeyPrefix}_Q${idx + 1}`;
          const answer = entry[responseKey];
          return (
            <Typography key={idx} sx={{ mb: 1 }}>
              <strong>{q.question}</strong>: {answer ?? "Not Available"}
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
            Governance Details - {selectedCompanyName}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {Object.entries(governanceQuestions["Governance"]).map(([sectionKey], idx) => {
                const responseKeyPrefix = `${sectionKey.replace(/\s/g, "")}`;
                const category = "Governance";
                return (
                  <Grid item xs={12} key={idx}>
                    <Accordion
                      expanded={expanded === sectionKey}
                      onChange={handleAccordionChange(sectionKey)}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{sectionKey}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {renderQuestionAnswers(category, sectionKey, responseKeyPrefix)}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GovernancePage;
