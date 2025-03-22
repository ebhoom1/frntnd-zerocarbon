import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalEmissions } from "../../../redux/features/emissionCalculation/totalEmissionSlice";

const TotalEmissionDialog = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();

  const { emissions, loading, error } = useSelector((state) => state.totalEmission);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchTotalEmissions(userId));
    }
  }, [dispatch, userId, open]);

  const emissionKeys = ["CO2", "CH4", "N2O", "SF6", "CO2e", "NCV"];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Total Emission Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : emissions ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Emission</strong></TableCell>
                <TableCell align="right"><strong>Value</strong></TableCell>
                <TableCell align="right"><strong>Unit</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emissionKeys.map((key) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell align="right">{emissions[key]}</TableCell>
                  <TableCell align="right">
                    {key === "NCV" ? "MJ" : "kg"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography textAlign="center">No Emission Data Found</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TotalEmissionDialog;
