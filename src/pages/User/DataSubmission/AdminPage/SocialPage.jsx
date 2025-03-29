import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Grid,
  Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../../../../api/axios";
import UserTableList from "../../../../components/Admin/userList/UserList";
import socialQuestions from "../../../../assets/data/DataSubmission/social.json";

const SocialPage = () => {
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

  const renderAnswers = (sectionKey) => {
    const questions = socialQuestions.Social[sectionKey];
    const responses = submissionData?.[`Social_${sectionKey.replace(/\s/g, "")}`];
    if (!questions || !responses) return <Typography>No Data Available</Typography>;

    return responses.map((entry, index) => (
      <Paper key={index} sx={{ mb: 2, p: 2, borderRadius: 2 }} elevation={2}>
        {questions.map((q, idx) => {
          const responseKey = `${sectionKey.replace(/\s/g, "")}_Q${idx + 1}`;
          const matchedKey = Object.keys(entry).find((key) => key.includes(`Q${idx + 1}`));
          const answer = entry[matchedKey];

          return (
            <Box key={idx} mb={1}>
              <Typography>
                <strong>{q.question}</strong>: {Array.isArray(answer) ? JSON.stringify(answer) : answer ?? "Not Available"}
              </Typography>
            </Box>
          );
        })}
      </Paper>
    ));
  };

  return (
    <Box sx={{ p: 4 }}>
      <UserTableList title="Select User" onUserSelect={handleUserSelect} />

      {selectedUserId && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#2e7d32" }}>
            Social Data - {selectedCompanyName}
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {Object.keys(socialQuestions.Social).map((section, idx) => (
                <Grid item xs={12} key={idx}>
                  <Accordion
                    expanded={expanded === section}
                    onChange={handleAccordionChange(section)}
                    sx={{ borderRadius: 2 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography >{section}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{renderAnswers(section)}</AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SocialPage;
