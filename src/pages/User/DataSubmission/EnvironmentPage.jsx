import React, { useState } from "react";
import axios from "../../../api/axios";
import { Container, Typography, Button } from "@mui/material";
import Section from "../../../components/User/DataSubmission/DataSubmissionSec";
import CustomAlert from "../../../components/Alert/Sweetalert";
import questionsData from "../../../assets/data/DataSubmission/environment.json";
import { useSelector } from "react-redux";
// import RenewableProject from "../../../components/User/DataSubmission/RenewableProjectForm";
import TotalEmissionDialogScope1 from "./TotalEmissionDialogScope1";
import TotalEmissionDialogScope2 from "./TotalEmissionDialogScope2";
import TotalEmissionDialogScope3 from "./TotalEmissionDialogScope3";
import MonthlyenvSubmission from './MonthlyenvSubmission';

const EnvironmentPage = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formKey, setFormKey] = useState(0); // 👈 Forces re-render after submission
  const [openScope1Dialog, setOpenScope1Dialog] = useState(false);
  const [openScope2Dialog, setOpenScope2Dialog] = useState(false);
  const [openScope3Dialog, setOpenScope3Dialog] = useState(false);

  const sectionsWithEmissionButton = [
    "Scope 1: Direct Emissions",
    "Scope 2: Indirect Emissions",
    "Scope 3: Value Chain Emissions",
  ];

  const handleInputChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      setAlert({
        type: "error",
        title: "User Not Logged In",
        text: "Please log in before submitting data.",
      });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      console.log("responses:", responses);
      const response = await axios.post("/api/submissions/submit", {
        userId,
        responses,
      });

      if (response.status === 200) {
        console.log("Submission Successful:", response.data);
        setAlert({
          type: "success",
          title: "Success!",
          text: "Your data has been submitted successfully!",
        });

        setResponses({}); // Clear responses
        setFormKey((prevKey) => prevKey + 1); // 👈 Force re-render to reset inputs & collapse accordions
      }
    } catch (err) {
      console.error("Error submitting data:", err);
      setAlert({
        type: "error",
        title: "Submission Failed",
        text: "An error occurred while submitting your data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <CustomAlert alert={alert} setAlert={setAlert} />
  <MonthlyenvSubmission/>
      {/* Force re-render after submission by changing formKey */}
      <div key={formKey}>
        {Object.entries(questionsData).map(([sectionName, subcategories]) => (
          <div key={sectionName} style={{ marginBottom: "30px" }}>
            {/* <Typography variant="h5" style={{ marginBottom: "10px" }}>
              {sectionName}
            </Typography> */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <Typography variant="h5">{sectionName}</Typography>
              {sectionName === "Scope 1: Direct Emissions" && (
                <Button variant="outlined" size="small" onClick={() => setOpenScope1Dialog(true)}>
                  Total Emission
                </Button>
              )}
              {sectionName === "Scope 2: Indirect Emissions" && (
                <Button variant="outlined" size="small" onClick={() => setOpenScope2Dialog(true)}>
                  Total Emission
                </Button>
              )}
              {sectionName === "Scope 3: Value Chain Emissions" && (
                <Button variant="outlined" size="small" onClick={() => setOpenScope3Dialog(true)}>
                  Total Emission
                </Button>
              )}
            </div>


            {Object.entries(subcategories).map(([subcategory, questions]) => (
              <Section
                key={subcategory}
                sectionName={sectionName}
                subcategory={subcategory}
                questions={questions}
                handleInputChange={handleInputChange}
                resetTrigger={formKey}
              />
            ))}
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Submitting..." : "Submit Data"}
      </Button>
      <TotalEmissionDialogScope1
        open={openScope1Dialog}
        handleClose={() => setOpenScope1Dialog(false)}
        userId={userId}

      />
      <TotalEmissionDialogScope2
        open={openScope2Dialog}
        handleClose={() => setOpenScope2Dialog(false)}
        userId={userId}
      />
      <TotalEmissionDialogScope3
        open={openScope3Dialog}
        handleClose={() => setOpenScope3Dialog(false)}
        userId={userId}

      />
    </Container>
  );
};

export default EnvironmentPage;
