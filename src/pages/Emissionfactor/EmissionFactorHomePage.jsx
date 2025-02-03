import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FactoryIcon from "@mui/icons-material/Factory";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import RecyclingIcon from "@mui/icons-material/Recycling";

const EmissionFactorHomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 4,
        gap: 4,
      }}
    >
      {/* First Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: 5,
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, color: "#333" }}>
          Scope 1 - Direct Emission
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: "#ffebee",
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/mobilecombustion")}
          >
            <LocalFireDepartmentIcon sx={{ fontSize: 50, color: "#d32f2f" }} />{" "}
            <Typography variant="h7" mt={2}>
              Mobile Combustion
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: "#e3f2fd",
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/industrialprocesses")}
          >
            <FactoryIcon sx={{ fontSize: 50, color: "#616161" }} />
            <Typography variant="h7" mt={2}>
              Industrial Processes
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: "#fff3e0",
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/fugitiveemissions")}
          >
            <CloudQueueIcon sx={{ fontSize: 50, color: "#1565c0" }} />

            <Typography variant="h7" mt={2}>
              Fugitive Emissions
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Second Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: 5,
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, color: "#333" }}>
          Scope 2 - Indirect Emission
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: "#e8f5e9",
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/electricityemissionfactor")}
          >
            <ElectricBoltIcon sx={{ fontSize: 50, color: "#ffeb3b" }} />
            <Typography variant="h7" mt={2}>
              Electricity Emission Factor
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*Third Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: 5,
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, color: "#333" }}>
          Scope 3 Emission
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: "#ffe0b2",
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/purchasedgoods-services")}
          >
            <ShoppingCartIcon sx={{ fontSize: 50, color: "#1976d2" }} />
            <Typography variant="h7" mt={2} textAlign={"center"}>
              Purchased Goods & Services
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: "#d0f0c0",
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/endoflifetreatment")}
          >
            <DeleteSweepIcon sx={{ fontSize: 50, color: "#795548" }} />
            <Typography variant="h7" mt={2} textAlign={"center"}>
              End of Life Treatment
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              padding: 3,
              backgroundColor: "#ffebee",
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/usesoldproducts")}
          >
            <RecyclingIcon sx={{ fontSize: 50, color: "#4caf50" }} />
            <Typography variant="h7" mt={2} textAlign={"center"}>
              Use of Sold Products/Services
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmissionFactorHomePage;
