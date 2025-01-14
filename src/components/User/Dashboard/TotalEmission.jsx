import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const EmissionDashboard = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [period, setPeriod] = useState("monthly");
  const [emissionData, setEmissionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch emissions data
  const fetchEmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Calculate and save emissions
      await axios.post("/api/total-emissions", {
        userId,
        period,
      });

      // Step 2: Fetch emissions
      const response = await axios.get(`/api/total-emissions/${userId}`);
      setEmissionData(response.data.data);
    } catch (err) {
      console.error("Error fetching emissions data:", err);
      setError("Failed to fetch emissions data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmissions();
  }, [userId, period]);

  // Filter data based on the selected period
  useEffect(() => {
    const filtered = emissionData.filter((item) => item.period === period);
    setFilteredData(filtered);
  }, [emissionData, period]);
console.log("emissionData:",emissionData);
  // Prepare labels and data for the chart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const labels =
    period === "monthly"
      ? monthNames // Use month names for monthly data
      : filteredData.map((item) => item.periodValue); // Use periodValue for yearly or other data

  const totalCO2e = filteredData.map((item) => item.totalEmissionCO2e);
  const cumulativeCO2e = filteredData.map((item) => item.cumulativeEmissionCO2e);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Emissions (CO2e)",
        data: totalCO2e,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "Cumulative Emissions (CO2e)",
        data: cumulativeCO2e,
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        padding: 2,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: "480px",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Total Emission
      </Typography>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-start", alignItems: "left", gap: "10px" }}>
        <label htmlFor="period" style={{ fontSize: "14px", color: "#333" }}>
          Select Period:
        </label>
        <select
          id="period"
          value={period}
          onChange={handlePeriodChange}
          style={{
            border: "none",
            fontSize: "14px",
            backgroundColor: "#f9f9f9",
            color: "#333",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0f7fa")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#f9f9f9")}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && <Line id="emission-chart" data={data} options={options} />}
    </Paper>
  );
};

export default EmissionDashboard;
