import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import companyEmissionsData from "./companyEmissionData.json";

const SCOPE_COLORS = ["#66BB6A", "#81C784", "#A5D6A7"];

const scopeData = [
  { name: "Scope 1", value: 200 },
  { name: "Scope 2", value: 300 },
  { name: "Scope 3", value: 100 },
];

const MonthlyEmissionsBarChart = ({ data, companyName }) => {
  const formattedData = data.map((entry) => ({
    month: entry.month,
    ...entry,
  }));

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        padding: 1,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="bold" align="center">
        Monthly Emissions Trends
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {companyName || "All Scopes"}
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          barCategoryGap="30%"
          barGap={5}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} interval={0} />
          <YAxis />
          <Tooltip />
          {Object.keys(formattedData[0] || {}).map((key) => {
            if (key !== "month") {
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill="#66BB6A"
                  name={key}
                />
              );
            }
            return null;
          })}
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const EmissionSourceBarChart = ({ data, scopeName }) => {
  const formattedData = data.map((entry) => ({
    name: entry.name,
    value: entry.value,
  }));

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        padding: 1,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="bold" align="center">
        Emission Sources
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Emission details for {scopeName || "All Scopes"}
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={formattedData} layout="vertical" barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12 }} // Adjust the font size
            width={150} // Increase the width to accommodate longer labels
          />
          <XAxis type="number" />
          <Tooltip />
          <Bar dataKey="value" fill="#66BB6A" name="Emission Sources" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const PieChartScopeCompany = () => {
  const [selectedScope, setSelectedScope] = useState(null);

  const selectedMonthlyData =
    selectedScope && companyEmissionsData[selectedScope]
      ? companyEmissionsData[selectedScope]
      : companyEmissionsData["All Scopes"];
      
  const selectedEmissionData =
    selectedScope && companyEmissionsData[selectedScope]
      ? Object.entries(companyEmissionsData[selectedScope][0] || {})
          .filter(([key]) => key !== "month")
          .map(([name, value]) => ({ name, value }))
      : Object.entries(companyEmissionsData["All Scopes"][0] || {})
          .filter(([key]) => key !== "month")
          .map(([name, value]) => ({ name, value }));

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={3}>
        {/* Scope Pie Chart */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ padding: 1, borderRadius: 2 }}>
            <Typography variant="h6" align="center" fontWeight="bold">
              Scopes
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Click a scope to view emission source details
            </Typography>
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={scopeData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  onClick={(entry) => setSelectedScope(entry.name)}
                >
                  {scopeData.map((entry, index) => (
                    <Cell key={index} fill={SCOPE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Emission Source Bar Chart */}
        <Grid item xs={12} md={4}>
          <EmissionSourceBarChart
            data={selectedEmissionData}
            scopeName={selectedScope || "All Scopes"}
          />
        </Grid>

        {/* Monthly Emissions Bar Chart */}
        <Grid item xs={12} md={5}>
          <MonthlyEmissionsBarChart
            data={selectedMonthlyData}
            companyName={selectedScope || "All Scopes"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PieChartScopeCompany;
