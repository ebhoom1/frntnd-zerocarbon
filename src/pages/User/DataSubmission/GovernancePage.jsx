import React, { useState } from "react";
import axios from "../../../api/axios";
import { Container, Typography, Button } from "@mui/material";
import UploadSec from "./UploadSecGovernance";
import GovernanceSec from "../../../components/User/DataSubmission/GovernanceSec";
import CustomAlert from "../../../components/Alert/Sweetalert";
import governanceData from "../../../assets/data/DataSubmission/governance.json";
import { useSelector } from "react-redux";
// import RenewableProject from "../../../components/User/DataSubmission/RenewableProjectForm";

const GovernancePage = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formKey, setFormKey] = useState(0); // 👈 Forces re-render after submission

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

        // setResponses({}); // Clear responses
        // setFormKey((prevKey) => prevKey + 1); // 👈 Force re-render to reset inputs & collapse accordions
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
      {/* Force re-render after submission by changing formKey */}
      <div key={formKey}>
        {Object.entries(governanceData).map(([sectionName, subcategories]) => (
          <div key={sectionName} style={{ marginBottom: "30px" }}>
            <Typography variant="h5" style={{ marginBottom: "10px" }}>
              {sectionName}
            </Typography>

            {Object.entries(subcategories).map(([subcategory, questions]) => (
              <GovernanceSec
                key={subcategory}
                sectionName={sectionName}
                subcategory={subcategory}
                questions={questions}
                handleInputChange={handleInputChange}
              />
            ))}
          </div>
        ))}
      </div>
      <UploadSec
      userId={userId}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Submitting..." : "Submit All Data"}
      </Button>
    </Container>
  );
};

export default GovernancePage;
