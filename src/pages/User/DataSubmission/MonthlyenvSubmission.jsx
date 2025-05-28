import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Section from "../../../components/User/DataSubmission/MonthlyenvSubmissionForm";
import CustomAlert from "../../../components/Alert/Sweetalert";
import questionsData from "../../../assets/data/DataSubmission/monthlyEnvironment.json";
import { useSelector } from "react-redux";
import TotalEmissionDialogScope1 from "./TotalEmissionDialogScope1";
import TotalEmissionDialogScope2 from "./TotalEmissionDialogScope2";
import TotalEmissionDialogScope3 from "./TotalEmissionDialogScope3";

const EnvironmentPage = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const userName = useSelector((state) => state.auth.user?.userName);
  const [bod, setBod] = useState(null);
  const [cod, setCod] = useState(null);

  const getDateRangeFromMonthYear = (monthYear) => {
    const [monthStr, yearStr] = monthYear.split("-");
    const monthIndex = monthNames.indexOf(monthStr); // 0-based
    const year = parseInt(yearStr);

    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0); // last day of month

    const format = (date) => {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    };

    return {
      startDate: format(startDate),
      endDate: format(endDate),
    };
  };
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [reportingMonth, setReportingMonth] = useState(() => {
    const now = new Date();
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    return `${month}-${year}`;
  });
  const [missingKeys, setMissingKeys] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formKey, setFormKey] = useState(0); // 👈 Forces re-render after submission
  const [openScope1Dialog, setOpenScope1Dialog] = useState(false);
  const [openScope2Dialog, setOpenScope2Dialog] = useState(false);
  const [openScope3Dialog, setOpenScope3Dialog] = useState(false);

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const handleInputChange = (key, value, monthValue = null) => {
    setResponses((prev) => {
      const updated = { ...prev, [key]: value };
      if (monthValue) updated["month"] = monthValue;
      return updated;
    });
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
      const { month, ...pureResponses } = responses;

      const response = await axios.post("/api/submissions/monthly-submission", {
        userId,
        month: month || getCurrentMonth(),
        responses: pureResponses,
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

  useEffect(() => {
    const fetchBodCod = async () => {
      if (userName === "HH014" && reportingMonth) {
        const { startDate, endDate } =
          getDateRangeFromMonthYear(reportingMonth);
        console.log("startDate", startDate);
        console.log("endDate", endDate);
        try {
          const res = await axios.get(
            `https://api.ocems.ebhoom.com/api/average/user/HH014/stack/STP/time-range/average`,
            { params: { startDate, endDate } }
          );

          const data = res.data?.data || {};
          setBod(data.BOD || null);
          setCod(data.COD || null);
        } catch (err) {
          console.error("Error fetching BOD/COD:", err);
          setBod(null);
          setCod(null);
        }
      }
    };

    fetchBodCod();
  }, [reportingMonth, userName]);

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <CustomAlert alert={alert} setAlert={setAlert} />
      <TextField
        select
        label="Reporting Month"
        value={reportingMonth}
        onChange={(e) => setReportingMonth(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      >
        {[...Array(12)].map((_, idx) => {
          const year = new Date().getFullYear();
          const val = `${monthNames[idx]}-${year}`; // 👈 Now using Jan-2024 format
          return (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          );
        })}
      </TextField>

      {/* Force re-render after submission by changing formKey */}
      <div key={formKey}>
        {Object.entries(questionsData).map(([sectionName, subcategories]) => (
          <div key={sectionName} style={{ marginBottom: "30px" }}>
            {/* <Typography variant="h5" style={{ marginBottom: "10px" }}>
              {sectionName}
            </Typography> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Typography variant="h5">{sectionName}</Typography>
              {sectionName === "Scope 1: Direct Emissions" && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenScope1Dialog(true)}
                >
                  Total Emission
                </Button>
              )}
              {sectionName === "Scope 2: Indirect Emissions" && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenScope2Dialog(true)}
                >
                  Total Emission
                </Button>
              )}
              {sectionName === "Scope 3: Value Chain Emissions" && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenScope3Dialog(true)}
                >
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
                reportingMonth={reportingMonth}
                bod={bod}
                cod={cod}
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
        {loading ? "Submitting..." : "Submit Monthly Data"}
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
