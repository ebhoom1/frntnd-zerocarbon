// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import Dashboard from "./Dashboard";
// import ClientsHomePage from "../../pages/RegisteredClients/ClientsHomePage.jsx";
// import UserTable from "../../pages/Admin/userTableForflowchartView/UserTable";
// import FlowchartUser from "../../components/User/flowchart/FlowchartUser.jsx";
// import EmissionFactorHomePage from "../../pages/Emissionfactor/EmissionFactorHomePage.jsx";
// import UserForm from "../../pages/User/UserForm";
// import EmissionFactor from "../../pages/Emissionfactor/EmissionFactor.jsx";
// import ActiveUsers from "../../pages/RegisteredClients/ActiveUsers.jsx";
// import RegisteredClients from '../../pages/RegisteredClients/RegisteredClientsTable.jsx'
// import pic from "../../assets/images/pic.jpeg";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { Box, Typography, Avatar, IconButton } from "@mui/material";
// import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

// const ContentArea = () => {
//   const selectedItem = useSelector((state) => state.sidebar.selectedItem);
//   const userType = useSelector((state) => state.auth.userType);
//   const location = useLocation();
//   const dispatch = useDispatch();
//   console.log("userType:", userType);

//   useEffect(() => {
//     if (!selectedItem && location.pathname !== "/emissionfactor-table") {
//       dispatch(setSelectedItem({ id: "dashboard", label: "Dashboard" }));
//     }
//   }, [selectedItem, location.pathname, dispatch]);

//   // Clear selectedItem when navigating to /emissionfactor-table
//   useEffect(() => {
//     if (location.pathname === "/emissionfactor-table") {
//       dispatch(setSelectedItem(null));
//     }
//   }, [location.pathname, dispatch]);

//   const renderContent = () => {
//     if (!selectedItem) return <Dashboard />; // Render Dashboard by default
//     if (userType === "admin" || userType === "superAdmin") {
//       switch (selectedItem.id) {
//         case "dashboard":
//           return <Dashboard />;
//         case "leads":
//           return <ClientsHomePage />;
//         case "submissions":
//           return ;
//         case "hierarchychart":
//           return <UserTable />;
//         case "emissionfactormanagement":
//           return <EmissionFactorHomePage/>;
//           case "registeredClients":
//         return <RegisteredClients />; 
//       case "activeClients":
//         return <ActiveUsers />; 
//         default:
//           return <Dashboard />;
//       }
//     } else {
//       switch (selectedItem.id) {
//         case "dashboard":
//           return;
//         case "hierarchychartuser":
//           return <FlowchartUser />;
//         case "form":
//           return <UserForm />;
//         case "support":
//           return;
//         case "settings":
//           return;
//         default:
//           return;
//       }
//     }
//   };

//   return (
//     <div style={{ flex: 1, padding: 15, overflow: "auto",backgroundColor: "#f4f6f9",  }}>
//       <Box
//         sx={{
//           mb: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           borderRadius: 2,
//         }}       
//       >
//         <Typography variant="h5" fontWeight="bold">
//           {selectedItem?.label || "Dashboard"}
//         </Typography>
//         <Box display="flex" alignItems="center" gap={2}>
//           <IconButton>
//             <NotificationsNoneOutlinedIcon />
//           </IconButton>
//           {/* <Avatar src={`${pic}`} />
//           <Box>
//             <Typography fontWeight="bold">John Jacob</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {userType === "admin" || userType === "superAdmin"
//                 ? "Admin"
//                 : "User"}
//             </Typography>
//           </Box> */}
//         </Box>
//       </Box>

//       {renderContent()}
//     </div>
//   );
// };

// export default ContentArea;


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Typography, IconButton, InputBase, Paper } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Dashboard from "./Dashboard";
import ClientsHomePage from "../../pages/RegisteredClients/ClientsHomePage.jsx";
import UserTable from "../../pages/Admin/userTableForflowchartView/UserTable";
import FlowchartUser from "../../components/User/flowchart/FlowchartUser.jsx";
import EmissionFactorHomePage from "../../pages/Emissionfactor/EmissionFactorHomePage.jsx";
import UserForm from "../../pages/User/UserForm";
import EmissionFactor from "../../pages/Emissionfactor/EmissionFactor.jsx";
import ActiveUsers from "../../pages/RegisteredClients/ActiveUsers.jsx";
import RegisteredClients from "../../pages/RegisteredClients/RegisteredClientsTable.jsx";
import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
import MapComponent from "./Charts/MapComponent.jsx";

const ContentArea = () => {
  const selectedItem = useSelector((state) => state.sidebar.selectedItem);
  const userType = useSelector((state) => state.auth.userType);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedItem && location.pathname !== "/emissionfactor-table") {
      dispatch(setSelectedItem({ id: "dashboard", label: "Dashboard" }));
    }
  }, [selectedItem, location.pathname, dispatch]);

  // Clear selectedItem when navigating to /emissionfactor-table
  useEffect(() => {
    if (location.pathname === "/emissionfactor-table") {
      dispatch(setSelectedItem(null));
    }
  }, [location.pathname, dispatch]);

  const renderContent = () => {
    if (!selectedItem) return <Dashboard />; // Render Dashboard by default
    if (userType === "admin" || userType === "superAdmin") {
      switch (selectedItem.id) {
        case "dashboard":
          return <Dashboard />;
        case "leads":
          return <ClientsHomePage />;
        case "submissions":
          return ;
        case "hierarchychart":
          return <UserTable />;
        case "emissionfactormanagement":
          return <EmissionFactorHomePage />;
        case "registeredClients":
          return <RegisteredClients />;
        case "activeClients":
          return <ActiveUsers />;
        default:
          return <Dashboard />;
      }
    } else {
      switch (selectedItem.id) {
        case "dashboard":
          return;
        case "hierarchychartuser":
          return <FlowchartUser />;
        case "form":
          return <UserForm />;
        case "support":
          return;
        case "settings":
          return;
        default:
          return;
      }
    }
  };

  return (
    <div style={{ flex: 1, padding: 15, overflow: "auto", backgroundColor: "#f4f6f9" }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {selectedItem?.label || "Dashboard"}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          {selectedItem?.id === "dashboard" && (
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 200,
                border: "1px solid #D8DBBD",
                borderRadius: 20,
                padding: "1px 5px",
                boxShadow: "none",
              }}
            >
              <IconButton sx={{ p: "5px" }}>
                <SearchIcon style={{ color: "#5A6C57" }} />
              </IconButton>
              <InputBase
                placeholder="Search Company"
                inputProps={{ "aria-label": "search" }}
                sx={{                 
                  flex: 1,
                  fontSize: "16px",
                  color: "#66785F",
                  fontWeight: 500,
                }}
              />
            </Paper>
          )}
        </Box>
      </Box>
      {renderContent()}
    </div>
  );
};

export default ContentArea;
