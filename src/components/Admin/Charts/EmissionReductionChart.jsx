import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import MonthlyEmissionsBarChart from "./MonthlyEmissionsBarChart";

// Colors for charts
const COMPANY_COLORS = ["#1ABC9C", "#3498DB", "#E74C3C"];
const SCOPE_COLORS = ["#FFC107", "#8E44AD", "#2ECC71"];

// Data for the Company Pie Chart
const companyData = [
  { name: "Company X", value: 250, color: COMPANY_COLORS[0] },
  { name: "Company Y", value: 400, color: COMPANY_COLORS[1] },
  { name: "Company Z", value: 150, color: COMPANY_COLORS[2] },
];

// Scope data based on the company selected
const scopeData = {
  "Company X": [
    { name: "Scope A", value: 120, color: SCOPE_COLORS[0] },
    { name: "Scope B", value: 80, color: SCOPE_COLORS[1] },
    { name: "Scope C", value: 50, color: SCOPE_COLORS[2] },
  ],
  "Company Y": [
    { name: "Scope A", value: 200, color: SCOPE_COLORS[0] },
    { name: "Scope B", value: 120, color: SCOPE_COLORS[1] },
    { name: "Scope C", value: 80, color: SCOPE_COLORS[2] },
  ],
  "Company Z": [
    { name: "Scope A", value: 70, color: SCOPE_COLORS[0] },
    { name: "Scope B", value: 50, color: SCOPE_COLORS[1] },
    { name: "Scope C", value: 30, color: SCOPE_COLORS[2] },
  ],
};

// Monthly emissions reduction data for companies
const monthlyReductionData = {
  "Company X": [
    { month: "Jan", reduction: 20 },
    { month: "Feb", reduction: 15 },
    { month: "Mar", reduction: 25 },
  ],
  "Company Y": [
    { month: "Jan", reduction: 30 },
    { month: "Feb", reduction: 35 },
    { month: "Mar", reduction: 40 },
  ],
  "Company Z": [
    { month: "Jan", reduction: 10 },
    { month: "Feb", reduction: 8 },
    { month: "Mar", reduction: 12 },
  ],
  "All Companies": [
    { month: "Jan", reduction: 60 },
    { month: "Feb", reduction: 58 },
    { month: "Mar", reduction: 77 },
  ],
};

const COMPANY_LEGEND = [
  { color: COMPANY_COLORS[0], label: "Company X" },
  { color: COMPANY_COLORS[1], label: "Company Y" },
  { color: COMPANY_COLORS[2], label: "Company Z" },
];

const SCOPE_LEGEND = [
  { color: SCOPE_COLORS[0], label: "Scope A" },
  { color: SCOPE_COLORS[1], label: "Scope B" },
  { color: SCOPE_COLORS[2], label: "Scope C" },
];

const EmissionReductionChart = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Dynamically update scope chart data based on the selected company
  const scopeChartData =
    selectedCompany && scopeData[selectedCompany]
      ? scopeData[selectedCompany]
      : Object.keys(scopeData).flatMap((key) => scopeData[key]);

  const reductionData = selectedCompany
    ? monthlyReductionData[selectedCompany]
    : monthlyReductionData["All Companies"];

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding:"3"
      }} 
    >
      <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
        {/* Pie Charts and Bar Chart in the Same Row */}
        <Grid container spacing={3} alignItems="stretch">
          {/* Company Pie Chart */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 5,
                padding: 2,
                backgroundColor: "#fff",
                height: 350,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" align="center">
                Companies
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
              >
                Click a company to view its scope details
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={companyData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    onClick={(entry) => setSelectedCompany(entry.name)}
                  >
                    {companyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "black",
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: "12px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    itemStyle={{ color: "white", fontWeight: "bold" }}
                    formatter={(value, name) => [`${value}`, `${name}`]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box>
                {COMPANY_LEGEND.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: item.color,
                        borderRadius: "50%",
                        mr: 1,
                      }}
                    ></Box>
                    <Typography variant="body2">{item.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Scope Pie Chart */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 5,
                padding: 2,
                backgroundColor: "#fff",
                height: 350,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" align="center">
                Scopes
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
              >
                Reduction details for {selectedCompany || "All Companies"}
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={scopeChartData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={0}
                  >
                    {scopeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "black",
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: "12px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    itemStyle={{ color: "white", fontWeight: "bold" }}
                    formatter={(value, name) => [`${value}`, `${name}`]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box>
                {SCOPE_LEGEND.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: item.color,
                        borderRadius: "50%",
                        mr: 1,
                      }}
                    ></Box>
                    <Typography variant="body2">{item.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Monthly Reduction Bar Chart */}
          <Grid item xs={12} md={6}>
            <MonthlyEmissionsBarChart data={reductionData} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmissionReductionChart;

