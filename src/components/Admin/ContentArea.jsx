// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { Box, Typography, IconButton, InputBase, Paper } from "@mui/material";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import Dashboard from "./Dashboard";
// import ClientsHomePage from "../../pages/RegisteredClients/ClientsHomePage.jsx";
// import UserTable from "../../pages/Admin/userTableForflowchartView/UserTable";
// import FlowchartUser from "../../components/User/flowchart/FlowchartUser.jsx";
// import EmissionFactorHomePage from "../../pages/Emissionfactor/EmissionFactorHomePage.jsx";
// import UserForm from "../../pages/User/UserForm";
// import EmissionFactor from "../../pages/Emissionfactor/EmissionFactor.jsx";
// import ActiveUsers from "../../pages/RegisteredClients/ActiveUsers.jsx";
// import RegisteredClients from "../../pages/RegisteredClients/RegisteredClientsTable.jsx";
// import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
// import MapComponent from "./Charts/MapComponent.jsx";

// const ContentArea = () => {
//   const selectedItem = useSelector((state) => state.sidebar.selectedItem);
//   const userType = useSelector((state) => state.auth.userType);
//   const location = useLocation();
//   const dispatch = useDispatch();

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
//           return <EmissionFactorHomePage />;
//         case "registeredClients":
//           return <RegisteredClients />;
//         case "activeClients":
//           return <ActiveUsers />;
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
//     <div style={{ flex: 1, padding: 15, overflow: "auto", backgroundColor: "#f4f6f9" }}>
//       <Box
//         sx={{
//           mb: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           // borderBottomLeftRadius: 16,
//           // borderBottomRightRadius: 16,
//           // backgroundColor: "#DFF6DD",
//           // padding: 2, // Add padding for better appearance
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           {selectedItem?.label || "Dashboard"}
//         </Typography>
//         <Box display="flex" alignItems="center" gap={2}>
//           <IconButton>
//             <NotificationsNoneOutlinedIcon />
//           </IconButton>
//           {selectedItem?.id === "dashboard" && (
//             <Paper
//               component="form"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 width: 200,
//                 border: "1px solid #D8DBBD",
//                 borderRadius: 20,
//                 padding: "1px 5px",
//                 boxShadow: "none",
//               }}
//             >
//               <IconButton sx={{ p: "5px" }}>
//                 <SearchIcon style={{ color: "#5A6C57" }} />
//               </IconButton>
//               <InputBase
//                 placeholder="Search Company"
//                 inputProps={{ "aria-label": "search" }}
//                 sx={{
//                   flex: 1,
//                   fontSize: "16px",
//                   color: "#66785F",
//                   fontWeight: 500,
//                 }}
//               />
//             </Paper>
//           )}
//         </Box>
//       </Box>
//       {renderContent()}
//     </div>
//   );
// };

// export default ContentArea;

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { Box, Typography, IconButton, InputBase, Paper } from "@mui/material";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import Dashboard from "./Dashboard";
// import UserDashboard from "../../components/User/Dashboard/UserDashboard.jsx";
// import ClientsHomePage from "../../pages/RegisteredClients/ClientsHomePage.jsx";
// import UserTable from "../../pages/Admin/userTableForflowchartView/UserTable";
// import FlowchartUser from "../../components/User/flowchart/FlowchartUser.jsx";
// import EmissionFactorHomePage from "../../pages/Emissionfactor/EmissionFactorHomePage.jsx";
// import UserForm from "../../pages/User/UserForm";
// import EmissionFactor from "../../pages/Emissionfactor/EmissionFactor.jsx";
// import ActiveUsers from "../../pages/RegisteredClients/ActiveUsers.jsx";
// import RegisteredClients from "../../pages/RegisteredClients/RegisteredClientsTable.jsx";
// import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
// import MapComponent from "./Charts/MapComponent.jsx";
// import HeatMap from '../../components/User/Dashboard/HeatMap.jsx';

// const ContentArea = () => {
//   const selectedItem = useSelector((state) => state.sidebar.selectedItem);
//   const userType = useSelector((state) => state.auth.userType);
//   const location = useLocation();
//   const dispatch = useDispatch();

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
//           return;
//         case "hierarchychart":
//           return <UserTable />;
//         case "emissionfactormanagement":
//           return <EmissionFactorHomePage />;
//         case "registeredClients":
//           return <RegisteredClients />;
//         case "activeClients":
//           return <ActiveUsers />;
//         default:
//           return <Dashboard />;
//       }
//     } else {
//       switch (selectedItem.id) {
//         case "dashboard":
//           return <UserDashboard/>;
//         case "hierarchychartuser":
//           return <FlowchartUser />;
//         case "form":
//           return <UserForm />;
//         case "support":
//           return;
//         case "settings":
//           return ;
//         default:
//           return;
//       }
//     }
//   };

//   return (
//     <div style={{ flex: 1, overflow: "auto", backgroundColor: "#f4f6f9" }}>
//       <Box
//         sx={{
//           height: selectedItem?.id === "dashboard" ? "120px" : "70px", // Dynamic height
//           // width: selectedItem?.id === "dashboard" ? "100vw" : "100%",
//           padding: "1rem", // Adjust padding
//           display: "flex",
//           alignItems: "flex-start",
//           justifyContent: "space-between",
//           backgroundColor: "#4CAF50", // Green background
//           color: "#fff",
//           position: "relative", // Relative positioning for content overlap
//           zIndex: 1, // Ensure header is in the background
//           borderBottomLeftRadius: 16,
//           borderBottomRightRadius: 16,
//           transition: "height 0.3s ease", // Smooth transition for height changes
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           {selectedItem?.label || "Dashboard"}
//         </Typography>
//         <Box
//         display="flex"
//         alignItems="flex-start"
//         gap={2}

//         >
//           <IconButton>
//             <NotificationsNoneOutlinedIcon style={{ color: "#fff" }} />
//           </IconButton>
//           {selectedItem?.id === "dashboard" && (
//             <Paper
//               component="form"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 width: 200,
//                 border: "1px solid #D8DBBD",
//                 borderRadius: 20,
//                 padding: "1px 5px",
//                 boxShadow: "none",
//               }}
//             >
//               <IconButton sx={{ p: "5px" }}>
//                 <SearchIcon style={{ color: "#5A6C57" }} />
//               </IconButton>
//               <InputBase
//                 placeholder="Search here..."
//                 inputProps={{ "aria-label": "search" }}
//                 sx={{
//                   flex: 1,
//                   fontSize: "16px",
//                   color: "#66785F",
//                   fontWeight: 500,
//                 }}
//               />
//             </Paper>
//           )}
//         </Box>
//       </Box>
//       <div
//         style={{
//           flex: 1,
//           marginTop: selectedItem?.id === "dashboard" ? "-65px" : "0px", // Overlap content only for "dashboard"
//           padding: "1rem", // Padding for content
//           position: "relative", // Ensure proper layering
//           zIndex: 2, // Bring content to the front
//           transition: "all 0.3s ease", // Smooth transition for all changes
//         }}
//       >
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default ContentArea;

//make header responsive when scroll horizontally
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Typography, IconButton, InputBase, Paper } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Dashboard from "./Dashboard";
import UserDashboard from "../../components/User/Dashboard/UserDashboard.jsx";
import ClientsHomePage from "../../pages/RegisteredClients/ClientsHomePage.jsx";
import UserTable from "../../pages/Admin/userTableForflowchartView/UserTable";
import FlowchartUser from "../../components/User/flowchart/FlowchartUser.jsx";
import EmissionFactorHomePage from "../../pages/Emissionfactor/EmissionFactorHomePage.jsx";
import UserForm from "../../pages/User/UserForm";
import ActiveUsers from "../../pages/RegisteredClients/ActiveUsers.jsx";
import RegisteredClients from "../../pages/RegisteredClients/RegisteredClientsTable.jsx";
import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
import CalculationDataOfEmissionC02e from '../../pages/User/CalculationData/CalculationDataOfEmissionC02e.jsx'
import CalculateEmissionCO2e from '../../pages/User/CalculationData/CalculateEmissionCO2e.jsx';
import NodeListpage from '../../pages/User/CalculationData/NodeListPage.jsx';

const ContentArea = () => {
  const selectedItem = useSelector((state) => state.sidebar.selectedItem);
  const userType = useSelector((state) => state.auth.userType);
  const location = useLocation();
  const dispatch = useDispatch();
  const contentRef = useRef(null); // Reference to the scrollable container
  const [scrollOffset, setScrollOffset] = useState(0); // Track horizontal scroll

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(contentRef.current?.scrollLeft || 0); // Update scroll offset
    };

    const container = contentRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

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
          return;
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
          return <UserDashboard />;
        case "hierarchychartuser":
          return <FlowchartUser />;
        case "form":
          return <UserForm />;
        case "submissions":
          return <NodeListpage/>;
        case "report":
          return ;  
        case "settings":
          return;
        default:
          return;
      }
    }
  };

  return (
    <div
      ref={contentRef}
      style={{ flex: 1, overflow: "auto", backgroundColor: "#f4f6f9" }}
    >
      <Box
        sx={{
          height: selectedItem?.id === "dashboard" ? "120px" : "70px", // Dynamic height
          // width: selectedItem?.id === "dashboard" ? "100vw" : "100%",
          padding: "1rem", // Adjust padding
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#4CAF50", // Green background
          color: "#fff",
          position: "relative", // Relative positioning for content overlap
          zIndex: 1, // Ensure header is in the background
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          width: `calc(100% + ${scrollOffset}px)`, // Dynamic width
          transition: "height 0.3s ease", // Smooth transition for height changes
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {selectedItem?.label || "Dashboard"}
        </Typography>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <IconButton>
            <NotificationsNoneOutlinedIcon style={{ color: "#fff" }} />
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
                placeholder="Search here..."
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
      <div
        style={{
          flex: 1,
          marginTop: selectedItem?.id === "dashboard" ? "-65px" : "0px", // Overlap content only for "dashboard"
          padding: "1rem", // Padding for content
          position: "relative", // Ensure proper layering
          zIndex: 2, // Bring content to the front
          transition: "all 0.3s ease", // Smooth transition for all changes
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentArea;
