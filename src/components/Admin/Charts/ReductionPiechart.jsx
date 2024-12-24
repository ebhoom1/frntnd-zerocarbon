
import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import ReductionBarChart from "./ReductionBarChart"; // Second Component

const COMPANY_COLORS = ["#66BB6A", "#81C784", "#A5D6A7"];
const SCOPE_COLORS = ["#66BB6A", "#81C784", "#A5D6A7"];

const companyData = [
  { name: "Company A", value: 300, color: COMPANY_COLORS[0] },
  { name: "Company B", value: 200, color: COMPANY_COLORS[1] },
  { name: "Company C", value: 100, color: COMPANY_COLORS[2] },
];

const scopeReductionData = {
  "All Companies": [
    { name: "Scope 1", value: 230, color: SCOPE_COLORS[0] },
    { name: "Scope 2", value: 250, color: SCOPE_COLORS[1] },
    { name: "Scope 3", value: 120, color: SCOPE_COLORS[2] },
  ],
  "Company A": [
    { name: "Scope 1", value: 100, color: SCOPE_COLORS[0] },
    { name: "Scope 2", value: 150, color: SCOPE_COLORS[1] },
    { name: "Scope 3", value: 50, color: SCOPE_COLORS[2] },
  ],
  "Company B": [
    { name: "Scope 1", value: 80, color: SCOPE_COLORS[0] },
    { name: "Scope 2", value: 70, color: SCOPE_COLORS[1] },
    { name: "Scope 3", value: 50, color: SCOPE_COLORS[2] },
  ],
  "Company C": [
    { name: "Scope 1", value: 50, color: SCOPE_COLORS[0] },
    { name: "Scope 2", value: 30, color: SCOPE_COLORS[1] },
    { name: "Scope 3", value: 20, color: SCOPE_COLORS[2] },
  ],
};

const ReductionPieChart = () => {
  // Default to "All Companies"
  const [selectedCompany, setSelectedCompany] = useState("All Companies");

  const selectedScopeData =
    scopeReductionData[selectedCompany] || scopeReductionData["All Companies"];

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container>
        {/* Pie Charts and Bar Chart in the Same Row */}
        <Grid container spacing={2}>
          {/* Company Reduction Pie Chart */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                padding: 2,
                backgroundColor: "#fff",
                height: 350,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" align="center">
                Companies
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Click a company to view its scope reduction
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
            </Paper>
          </Grid>

          {/* Scope Reduction Pie Chart */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                padding: 2,
                backgroundColor: "#fff",
                height: 350,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" align="center">
                Scopes
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Reduction details for {selectedCompany}
              </Typography>
              <Box sx={{ position: "relative", }}>
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart>
                    {selectedScopeData.map((data, index) => (
                      <Pie
                        key={index}
                        data={[data]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={36 + index * 16}
                        outerRadius={48 + index * 16}
                        startAngle={85}
                        endAngle={350}
                        cornerRadius={5}
                      >
                        <Cell fill={data.color} />
                      </Pie>
                    ))}
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
                <Box
                  sx={{
                    position: "absolute",
                    top: "25%",
                    left: "68%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {selectedScopeData.reduce((acc, curr) => acc + curr.value, 0)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Total Reduction
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Monthly Reduction Bar Chart */}
          <Grid item xs={12} md={6}>
            <ReductionBarChart companyName={selectedCompany} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReductionPieChart;


