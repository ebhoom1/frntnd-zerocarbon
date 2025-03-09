

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
import UserList from "../../pages/Decarbonization/AdminPage/UserList.jsx";
import AlertSection from "../../pages/Admin/Alert/AlertSection.jsx";
import DataSubmissions from '../../pages/User/DataSubmission/DataSubmission.jsx'
import Environment from '../../pages/User/DataSubmission/EnvironmentPage.jsx'
import Social from '../../pages/User/DataSubmission/SocialPage.jsx'
import Governance from '../../pages/User/DataSubmission/GovernancePage.jsx';
import AssetsRenewableProject from '../../pages/User/DataSubmission/Assets&renewablePage.jsx';
import DownloadReportButton from "../../pages/Report/BRSRreport/DownloadReportButton.jsx";
import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";


const ContentArea = ({ toggleSidebar }) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const selectedItem = useSelector((state) => state.sidebar.selectedItem);
  const userType = useSelector((state) => state.auth.userType);
  const location = useLocation();
  const dispatch = useDispatch();
  const contentRef = useRef(null); // Reference to the scrollable container
  const [scrollOffset, setScrollOffset] = useState(0); // Track horizontal scroll

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollOffset(contentRef.current?.scrollLeft || 0); 
  //   };

  //   const container = contentRef.current;
  //   container?.addEventListener("scroll", handleScroll);

  //   return () => container?.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isLargeScreen) {
        // Only update scroll offset if on a large screen
        setScrollOffset(contentRef.current?.scrollLeft || 0);
      } else {
        // For smaller screens, no horizontal scroll effect is needed
        setScrollOffset(0);
      }
    };

    const container = contentRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll);
  }, [isLargeScreen]); // Modified: added isLargeScreen dependency to conditionally update scroll

  useEffect(() => {
    if (!selectedItem && location.pathname !== "/emissionfactor-table" ) {
      dispatch(setSelectedItem({ id: "dashboard", label: "Dashboard" }));
    }
  }, [selectedItem, location.pathname, dispatch]);

  // Clear selectedItem when navigating to /emissionfactor-table
  useEffect(() => {
    if (location.pathname === "/emissionfactor-table" ) {
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
        case "alerts": 
          return <AlertSection/>;
        case "decarbonisation": 
          return <UserList/>;
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
          return <DataSubmissions/>;
        case "report":
          return ;  
        case "environment":
          return <Environment/>;
        case "social":
          return <Social/>;
        case "governance":
          return <Governance/>;
        case "assetsrenewableproject":
          return <AssetsRenewableProject/>;
        default:
          return <UserDashboard />;
      }
    }
  };

  return (
    <div
      ref={contentRef}
      style={{ flex: 1, // Modified: Disable horizontal scrolling for non-large screens
      overflowX: isLargeScreen ? "auto" : "hidden", backgroundColor: "#f4f6f9" }}
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
          // width: `calc(100% + ${scrollOffset}px)`, // Dynamic width
           // Modified: Conditionally set width based on screen size
           width: isLargeScreen ? `calc(100% + ${scrollOffset}px)` : "100%",
          transition: "height 0.3s ease", // Smooth transition for height changes
        }}
      >
          {!isLargeScreen && (
          <IconButton onClick={toggleSidebar} sx={{ marginRight: 1 }}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
        )}
        <Typography variant="h5" fontWeight="bold">
          {/* {selectedItem?.label || "Dashboard"} */}
          {selectedItem?.id === "team" || selectedItem?.id === "decarbonization" ? "Dashboard" : selectedItem?.label || "Dashboard"}
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


