//make header responsive when scroll horizontally
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileDialog from "../../pages/User/Profile/ProfileDialog.jsx";

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
import ActiveUsers from "../../pages/RegisteredClients/AddUsers.jsx";
import RegisteredClients from "../../pages/RegisteredClients/RegisteredClientsTable.jsx";
import UserList from "../../pages/Decarbonization/AdminPage/UserList.jsx";
import AlertSection from "../../pages/Admin/Alert/AlertSection.jsx";
import SubscriptionPage from "../../pages/Admin/SubscriptionPage/SubscriptionPage.jsx"
import Environment from "../../pages/User/DataSubmission/EnvironmentPage.jsx";
import Social from "../../pages/User/DataSubmission/SocialPage.jsx";
import Governance from "../../pages/User/DataSubmission/GovernancePage.jsx";
import AssetsRenewableProject from "../../pages/User/DataSubmission/Assets&renewablePage.jsx";
import DownloadReportButton from "../../pages/Report/BRSRreport/DownloadReportButton.jsx";
import EnvironmentSecEmission from "../../pages/User/DataSubmission/AdminPage/EnvironmentSecEmission.jsx";
import SocialPage from "../../pages/User/DataSubmission/AdminPage/SocialPage.jsx";
import GovernancePage from "../../pages/User/DataSubmission/AdminPage/GovernancePage.jsx";
import AssetsAndRenewable from "../../pages/User/DataSubmission/AdminPage/AssetsAndRenewable.jsx";
import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import SectionBCsubmission from '../../pages/sectionBCbrsr/MainComponentFromSectionBC.jsx';
import GRI from "../../pages/User/GRI/GRIForm.jsx"

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

  const [openProfile, setOpenProfile] = useState(false);

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
    if (userType === "admin" || userType === "superAdmin" || userType === "consultantadmin") {
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
        case "subscription":
          return <SubscriptionPage />;
        case "decarbonisation":
          return <UserList />;
        case "environment":
          return <EnvironmentSecEmission />;
        case "social":
          return <SocialPage />;
        case "governance":
          return <GovernancePage />;
        case "assetsrenewableproject":
          return <AssetsAndRenewable />;
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
        case "report":
          return <DownloadReportButton />;
        case "environment":
          return <Environment />;
        case "social":
          return <Social />;
        case "governance":
          return <Governance />;
        case "assetsrenewableproject":
          return <AssetsRenewableProject />;
        case "gri":
          return < GRI/>;
        case "brsr":
          return <SectionBCsubmission/>;
        default:
          return <UserDashboard />;
      }
    }
  };

  return (
    <div
      ref={contentRef}
      style={{
        flex: 1, // Modified: Disable horizontal scrolling for non-large screens
        // overflowX: isLargeScreen ? "auto" : "hidden",
        overflowX:"hidden",
        backgroundColor: "#f4f6f9",
      }}
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
          {selectedItem?.id === "team" || selectedItem?.id === "decarbonization"
            ? "Dashboard"
            : selectedItem?.label || "Dashboard"}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}> 
  {/* Notification Icon */}
  {/* <IconButton>
    <NotificationsNoneOutlinedIcon style={{ color: "#fff" }} />
  </IconButton> */}

  {/* Customer Support - always visible */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ml:4
    }}
  >
    <Typography
      variant="body2"
      sx={{ color: "#fff", fontWeight: 600, lineHeight: 1 }}
    >
      Customer Support
    </Typography>
    <Typography variant="body2" sx={{ color: "#fff", lineHeight: 1 }}>
      Call{" "}
      <a
        href="tel:6282386462"
        style={{
          color: "#fff",
          textDecoration: "underline",
          fontWeight: "bold",
        }}
      >
        6282386462
      </a>
    </Typography>
  </Box>


    <IconButton onClick={() => setOpenProfile(true)}>
      <AccountCircleIcon style={{ color: "#fff" }} fontSize="large" />
    </IconButton>
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
      <ProfileDialog open={openProfile} onClose={() => setOpenProfile(false)} />
    </div>
  );
};

export default ContentArea;
