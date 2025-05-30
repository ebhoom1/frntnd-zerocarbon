import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchasedGoodsServices } from "../../../redux/features/emissionCalculation/purchasedGoodsServicesSlice";

const PurchasedGoodsServicesDialog = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();
  const { emissionData, loading, error } = useSelector(
    (state) => state.purchasedGoodsServices
  );

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchPurchasedGoodsServices(userId));
    }
  }, [open, userId, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Purchased Goods & Services Emission Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : emissionData?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>CO₂(kg) </TableCell>
                <TableCell>CH₄(kg) </TableCell>
                <TableCell>N₂O(kg) </TableCell>
                <TableCell>CO₂e(kg) </TableCell>
                <TableCell>Calculated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emissionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.material}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.emissionCO2}</TableCell>
                  <TableCell>{item.emissionCH4}</TableCell>
                  <TableCell>{item.emissionN2O}</TableCell>
                  <TableCell>{item.emissionCO2e}</TableCell>
                  <TableCell>{item.calculatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No emission data found.</Typography>
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

export default PurchasedGoodsServicesDialog;
