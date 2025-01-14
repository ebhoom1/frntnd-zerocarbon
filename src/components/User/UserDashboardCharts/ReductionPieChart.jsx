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
import carbonEmissionReductionData from "./carbonEmissionReductionData.json";

const SCOPE_COLORS = ["#66BB6A", "#81C784", "#A5D6A7"];
const REDUCTION_COLORS = ["#FF8A80", "#FF5252", "#FF1744"];

const scopeData = [
  { name: "Scope 1", value: 200 },
  { name: "Scope 2", value: 300 },
  { name: "Scope 3", value: 100 },
];

const ReductionBarChart = ({ data, scopeName }) => {
  const formattedData = data.map((entry) => ({
    name: entry.name,
    reduction: entry.reduction || 0,
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
        Reduction Details
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {scopeName || "All Scopes"}
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={formattedData} layout="vertical" barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12 }}
            width={100}
          />
          <XAxis type="number" />
          <Tooltip />
          <Bar
            dataKey="reduction"
            fill="#81C784"
            name="Reduction"
            barSize={15} // Adjust bar size for better spacing
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const ScopePieChart = ({ setSelectedScope }) => (
  <Paper elevation={3} sx={{ padding: 1, borderRadius: 2 }} >
    <Typography variant="h6" align="center" fontWeight="bold">
      Scopes
    </Typography>
    <Typography variant="body2" color="textSecondary" align="center">
      Click a scope to view reduction details
    </Typography>
    <ResponsiveContainer width="100%" height={230}>
      <PieChart>
        <Pie
          data={scopeData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
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
);

const MonthlyReductionBarChart = ({ data, scopeName }) => {
  const formattedData = data.map((entry) => ({
    month: entry.month,
    reduction: entry.reduction || 0,
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
        Monthly Reductions
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {scopeName || "All Scopes"}
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
          <Bar
            dataKey="reduction"
            fill="#81C784"
            name="Reduction"
            barSize={15}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const ReductionPieChart = () => {
  const [selectedScope, setSelectedScope] = useState(null);
  const selectedReductionData =
    selectedScope && carbonEmissionReductionData[selectedScope]
      ? Object.entries(carbonEmissionReductionData[selectedScope][0] || {})
          .filter(([key]) => key !== "month")
          .map(([name, reduction]) => ({ name, reduction }))
      : Object.entries(carbonEmissionReductionData["All Scopes"][0] || {})
          .filter(([key]) => key !== "month")
          .map(([name, reduction]) => ({ name, reduction }));

  const selectedMonthlyData =
    selectedScope && carbonEmissionReductionData[selectedScope]
      ? carbonEmissionReductionData[selectedScope]
      : carbonEmissionReductionData["All Scopes"];

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ScopePieChart setSelectedScope={setSelectedScope} />
        </Grid>

        <Grid item xs={12} md={4}>
          <ReductionBarChart
            data={selectedReductionData}
            scopeName={selectedScope || "All Scopes"}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <MonthlyReductionBarChart
            data={selectedMonthlyData}
            scopeName={selectedScope || "All Scopes"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReductionPieChart;
