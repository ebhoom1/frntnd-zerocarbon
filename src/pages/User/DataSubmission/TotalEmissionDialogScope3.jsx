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
import { fetchTotalScope3Emissions } from "../../../redux/features/emissionCalculation/totalEmissionScope3Slice";

const TotalScope3EmissionDialog = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();

  const { emissions, loading, error } = useSelector((state) => state.totalEmissionScope3);

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchTotalScope3Emissions(userId));
    }
  }, [dispatch, userId, open]);

  const emissionKeys = ["CO2", "CH4", "N2O", "CO2e"];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Total Scope 3 Emission Details</DialogTitle>
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
                  <TableCell align="right">kg</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography textAlign="center">No Scope 3 Emission Data Found</Typography>
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

export default TotalScope3EmissionDialog;
