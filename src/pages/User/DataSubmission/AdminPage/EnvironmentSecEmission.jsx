import React, { useState } from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import UserTableList from "../../../../components/Admin/userList/UserList";

// Emission Dialogs
import MobileCombustionEmissionDialog from "../../../../components/User/DataSubmission/MobileCombustionEmissionDialog";
import StationaryCombustionEmissionDialog from "../../../../components/User/DataSubmission/StationaryCombustionEmissionDialog";
import IndustrialProcessEmissionDialog from "../../../../components/User/DataSubmission/IndustrialProcessEmissionDialog";
import FugitiveEmissionDialog from "../../../../components/User/DataSubmission/FugitiveEmissionDialog";
import PurchasedElectricityDialog from "../../../../components/User/DataSubmission/PurchasedElectricityDialog";
import PurchasedSteamHeatCoolingEmissionDialog from "../../../../components/User/DataSubmission/PurchasedSteamHeatCoolingEmissionDialog";
import PurchasedGoodsServicesDialog from "../../../../components/User/DataSubmission/PurchasedGoodsServicesDialog";
import UseSoldProductEmissionDialog from "../../../../components/User/DataSubmission/UseSoldProductEmissionDialog";
import EndOfLifeTreatmentDialog from "../../../../components/User/DataSubmission/EndOfLifeTreatmentDialog";

// Total Emission Dialogs
import TotalEmissionDialogScope1 from "../TotalEmissionDialogScope1";
import TotalEmissionScope2Dialog from "../TotalEmissionDialogScope2";
import TotalScope3EmissionDialog from "../TotalEmissionDialogScope3";

const EnvironmentSecEmission = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  const [openDialog, setOpenDialog] = useState({
    mobile: false,
    stationary: false,
    industrial: false,
    fugitive: false,
    electricity: false,
    steam: false,
    goods: false,
    soldproduct: false,
    endlife: false,
    totalScope1: false,
    totalScope2: false,
    totalScope3: false,
  });

  const handleDialogOpen = (key) => setOpenDialog((prev) => ({ ...prev, [key]: true }));
  const handleDialogClose = (key) => setOpenDialog((prev) => ({ ...prev, [key]: false }));

  const handleUserSelect = (userId, companyName) => {
    setSelectedUserId(userId);
    setSelectedCompanyName(companyName);
  };

  return (
    <Box sx={{ p: 4 }}>
      <UserTableList
        title="Select User"
        onUserSelect={(userId, companyName) => handleUserSelect(userId, companyName)}
      />

      {selectedUserId && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#2e7d32" }}>
            Emission Details - {selectedCompanyName}
          </Typography>

          {/* SCOPE 1 */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Scope 1: Direct Emissions</Typography>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() => handleDialogOpen("totalScope1")}
            >
              Total Emission
            </Button>
          </Box>

          <Grid container spacing={2}>
            {["Mobile Combustion", "Stationary Combustion", "Industrial Processes", "Fugitive Emissions"].map((label, idx) => {
              const keys = ["mobile", "stationary", "industrial", "fugitive"];
              return (
                <Grid item xs={12} md={6} key={keys[idx]}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography>{label}</Typography>
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                      <Button variant="outlined" size="small" color="success" onClick={() => handleDialogOpen(keys[idx])}>
                        Emission Details
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* SCOPE 2 */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={5} mb={2}>
            <Typography variant="h6" fontWeight="bold">Scope 2: Indirect Emissions</Typography>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() => handleDialogOpen("totalScope2")}
            >
              Total Emission
            </Button>
          </Box>

          <Grid container spacing={2}>
            {["Purchased Electricity", "Purchased Steam, Heat, or Cooling"].map((label, idx) => {
              const keys = ["electricity", "steam"];
              return (
                <Grid item xs={12} md={6} key={keys[idx]}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography>{label}</Typography>
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                      <Button variant="outlined" size="small" color="success" onClick={() => handleDialogOpen(keys[idx])}>
                        Emission Details
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {/* SCOPE 3 */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={5} mb={2}>
            <Typography variant="h6" fontWeight="bold">Scope 3: Value Chain Emissions</Typography>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() => handleDialogOpen("totalScope3")}
            >
              Total Emission
            </Button>
          </Box>

          <Grid container spacing={2}>
            {["Purchased Goods Services", "Use of Sold Products", "End-of-Life Treatment of Sold Products"].map((label, idx) => {
              const keys = ["goods", "soldproduct", "endlife"];
              return (
                <Grid item xs={12} md={6} key={keys[idx]}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography>{label}</Typography>
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                      <Button variant="outlined" size="small" color="success" onClick={() => handleDialogOpen(keys[idx])}>
                        Emission Details
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Dialogs */}
      <MobileCombustionEmissionDialog open={openDialog.mobile} handleClose={() => handleDialogClose("mobile")} userId={selectedUserId} />
      <StationaryCombustionEmissionDialog open={openDialog.stationary} handleClose={() => handleDialogClose("stationary")} userId={selectedUserId} />
      <IndustrialProcessEmissionDialog open={openDialog.industrial} handleClose={() => handleDialogClose("industrial")} userId={selectedUserId} />
      <FugitiveEmissionDialog open={openDialog.fugitive} handleClose={() => handleDialogClose("fugitive")} userId={selectedUserId} />
      <PurchasedElectricityDialog open={openDialog.electricity} handleClose={() => handleDialogClose("electricity")} userId={selectedUserId} />
      <PurchasedSteamHeatCoolingEmissionDialog open={openDialog.steam} handleClose={() => handleDialogClose("steam")} userId={selectedUserId} />
      <PurchasedGoodsServicesDialog open={openDialog.goods} handleClose={() => handleDialogClose("goods")} userId={selectedUserId} />
      <UseSoldProductEmissionDialog open={openDialog.soldproduct} handleClose={() => handleDialogClose("soldproduct")} userId={selectedUserId} />
      <EndOfLifeTreatmentDialog open={openDialog.endlife} handleClose={() => handleDialogClose("endlife")} userId={selectedUserId} />

      <TotalEmissionDialogScope1 open={openDialog.totalScope1} handleClose={() => handleDialogClose("totalScope1")} userId={selectedUserId} />
      <TotalEmissionScope2Dialog open={openDialog.totalScope2} handleClose={() => handleDialogClose("totalScope2")} userId={selectedUserId} />
      <TotalScope3EmissionDialog open={openDialog.totalScope3} handleClose={() => handleDialogClose("totalScope3")} userId={selectedUserId} />
    </Box>
  );
};

export default EnvironmentSecEmission;
