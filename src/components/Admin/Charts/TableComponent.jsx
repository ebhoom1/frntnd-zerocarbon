import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const TableComponent = () => {
  const latestSubmissions = [
    {
      submissionId: "SUB001",
      clientName: "Client A",
      description: "Emission validation report",
      date: "2024-12-20",
      status: "Pending",
    },
    {
      submissionId: "SUB002",
      clientName: "Client B",
      description: "Scope reduction analysis",
      date: "2024-12-19",
      status: "Approved",
    },
    
  ];

  return (
    <>
    <Paper
      elevation={3}
      sx={{
        padding: 1,
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h7"
        fontWeight="bold"
       
        sx={{ marginBottom: 2 }}
      >
        Latest Submissions
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Submission ID</strong></TableCell>
              <TableCell><strong>Client Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
            {latestSubmissions.map((submission) => (
              <TableRow key={submission.submissionId}>
                <TableCell>{submission.submissionId}</TableCell>
                <TableCell>{submission.clientName}</TableCell>
                <TableCell>{submission.description}</TableCell>
                <TableCell>{submission.date}</TableCell>
                <TableCell>{submission.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </>
    
  );
};

export default TableComponent;
