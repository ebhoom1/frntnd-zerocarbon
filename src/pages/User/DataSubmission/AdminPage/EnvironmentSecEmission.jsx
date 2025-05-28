
// MODIFIED EnvironmentSecEmission COMPONENT BASED ON YOUR NEED
// NOW HANDLES End-of-Life Treatment array response TABLE FORMATTING MATCHING IMAGE SHOWN

import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Grid, Accordion, AccordionSummary,
  AccordionDetails, CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../../../../api/axios";
import UserTableList from "../../../../components/Admin/userList/UserList";
import RenderQuestionAnswers from './RenderQuestionAnswers';
import environmentQuestions from "../../../../assets/data/DataSubmission/environment.json";

// Emission Dialogs Imports
import MobileCombustionEmissionDialog from "../../../../components/User/DataSubmission/MobileCombustionEmissionDialog";
import StationaryCombustionEmissionDialog from "../../../../components/User/DataSubmission/StationaryCombustionEmissionDialog";
import IndustrialProcessEmissionDialog from "../../../../components/User/DataSubmission/IndustrialProcessEmissionDialog";
import FugitiveEmissionDialog from "../../../../components/User/DataSubmission/FugitiveEmissionDialog";
import PurchasedElectricityDialog from "../../../../components/User/DataSubmission/PurchasedElectricityDialog";
import PurchasedSteamHeatCoolingEmissionDialog from "../../../../components/User/DataSubmission/PurchasedSteamHeatCoolingEmissionDialog";
import PurchasedGoodsServicesDialog from "../../../../components/User/DataSubmission/PurchasedGoodsServicesDialog";
import UseSoldProductEmissionDialog from "../../../../components/User/DataSubmission/UseSoldProductEmissionDialog";
import EndOfLifeTreatmentDialog from "../../../../components/User/DataSubmission/EndOfLifeTreatmentDialog";

// Total Emission Dialogs
import TotalEmissionDialogScope1 from "../TotalEmissionDialogScope1";
import TotalEmissionScope2Dialog from "../TotalEmissionDialogScope2";
import TotalScope3EmissionDialog from "../TotalEmissionDialogScope3";

const emissionDialogMap = {
  MobileCombustion: { key: "mobile", dialog: MobileCombustionEmissionDialog },
  StationaryCombustion: { key: "stationary", dialog: StationaryCombustionEmissionDialog },
  IndustrialProcesses: { key: "industrial", dialog: IndustrialProcessEmissionDialog },
  FugitiveEmissions: { key: "fugitive", dialog: FugitiveEmissionDialog },
  PurchasedElectricity: { key: "electricity", dialog: PurchasedElectricityDialog },
  "PurchasedSteam,Heat,orCooling": { key: "steam", dialog: PurchasedSteamHeatCoolingEmissionDialog },
  PurchasedGoodsServices: { key: "goods", dialog: PurchasedGoodsServicesDialog },
  UseofSoldProducts: { key: "soldproduct", dialog: UseSoldProductEmissionDialog },
  "End-of-LifeTreatmentofSoldProducts": { key: "endlife", dialog: EndOfLifeTreatmentDialog }
};

const EnvironmentSecEmission = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [openDialog, setOpenDialog] = useState({
    mobile: false, stationary: false, industrial: false, fugitive: false,
    electricity: false, steam: false, goods: false, soldproduct: false, endlife: false,
    totalScope1: false, totalScope2: false, totalScope3: false
  });

  const handleDialogOpen = (key) => setOpenDialog(prev => ({ ...prev, [key]: true }));
  const handleDialogClose = (key) => setOpenDialog(prev => ({ ...prev, [key]: false }));

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

  const handleAccordionChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  return (
    <Box sx={{ p: 4 }}>
      <UserTableList title="Select User" onUserSelect={handleUserSelect} />
      {selectedUserId && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#2e7d32" }}>
            Emission Details - {selectedCompanyName}
          </Typography>
          {loading ? <CircularProgress /> : (
            Object.entries(environmentQuestions).map(([category, sections]) => (
              <Box key={category} sx={{ mb: 5 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="bold">{category}</Typography>
                  {(category.includes("Scope 1") || category.includes("Scope 2") || category.includes("Scope 3")) && (
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => handleDialogOpen(
                        category.includes("Scope 1") ? "totalScope1" : category.includes("Scope 2") ? "totalScope2" : "totalScope3"
                      )}
                    >
                      Total Emission
                    </Button>
                  )}
                </Box>
                <Grid container spacing={2}>
                  {Object.entries(sections).map(([sectionKey], idx) => {
                    const responseKeyPrefix = sectionKey.replace(/\s/g, "");
                    const isEmissionSection = Object.keys(emissionDialogMap).includes(responseKeyPrefix);
                    const emissionDialogKey = emissionDialogMap[responseKeyPrefix]?.key;
                    return (
                      <Grid item xs={12} key={sectionKey}>
                        <Accordion expanded={expanded === sectionKey} onChange={handleAccordionChange(sectionKey)}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                              <Typography>{sectionKey}</Typography>
                              {isEmissionSection && (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="success"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDialogOpen(emissionDialogKey);
                                  }}
                                  onFocus={(e) => e.stopPropagation()}
                                >Emission Details</Button>
                              )}
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RenderQuestionAnswers
                              category={category}
                              sectionKey={sectionKey}
                              responseKeyPrefix={responseKeyPrefix}
                              environmentQuestions={environmentQuestions}
                              submissionData={submissionData}
                            />
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ))
          )}
        </Box>
      )}

      {Object.entries(emissionDialogMap).map(([prefix, { key, dialog: DialogComponent }]) => (
        <DialogComponent
          key={key}
          open={openDialog[key]}
          handleClose={() => handleDialogClose(key)}
          userId={selectedUserId}
        />
      ))}

      <TotalEmissionDialogScope1 open={openDialog.totalScope1} handleClose={() => handleDialogClose("totalScope1")} userId={selectedUserId} />
      <TotalEmissionScope2Dialog open={openDialog.totalScope2} handleClose={() => handleDialogClose("totalScope2")} userId={selectedUserId} />
      <TotalScope3EmissionDialog open={openDialog.totalScope3} handleClose={() => handleDialogClose("totalScope3")} userId={selectedUserId} />
    </Box>
  );
};

export default EnvironmentSecEmission;
