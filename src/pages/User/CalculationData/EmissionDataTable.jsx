import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const EmissionDataTable = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return <Typography>No emission data available.</Typography>;
  }
console.log("data:",data)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Site Name</TableCell>
            <TableCell>Scope</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>Consumed Data</TableCell>
            <TableCell>CO2 Emission (kg)</TableCell>
            <TableCell>CH4 Emission (kg)</TableCell>
            <TableCell>N2O Emission (kg)</TableCell>
            <TableCell>Total Emission CO2e (kg)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.siteName}</TableCell> {/* Display label */}
              <TableCell>{row.scopeType}</TableCell>
              <TableCell>{`${row.startDate} - ${row.endDate}`}</TableCell>
              <TableCell>{row.consumedData}</TableCell>
              <TableCell>{row.emissionCO2}</TableCell>
              <TableCell>{row.emissionCH4}</TableCell>
              <TableCell>{row.emissionN2O}</TableCell>
              <TableCell>{row.emissionCO2e}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit(row)}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(row._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmissionDataTable;
