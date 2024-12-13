import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import ReportIcon from "@mui/icons-material/Report";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BarChartIcon from "@mui/icons-material/BarChart";
import SupportIcon from "@mui/icons-material/Support";
import TableViewIcon from '@mui/icons-material/TableView';
import GroupIcon from '@mui/icons-material/Group';
import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
import { logout } from "../../redux/features/auth/authSlice";
import {
  ListItemIcon,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import logo from "../../assets/images/logo1.svg";

const Sidebar = () => {
  const userType = useSelector((state) => state.auth.userType);
  console.log("userType:", userType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarItems =
    userType === "admin" || userType === "superAdmin"
      ? [
          { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
          { id: "leads", label: "Clients", icon: <GroupIcon /> },
          { id: "leads", label: "Submissions", icon: <GroupIcon /> },
          {
            id: "hierarchychart",
            label: "Boundaries and Scopes",
            icon: <MultilineChartIcon />,
          },
          {
            id: "emissionfactormanagement",
            label: "Emission Factors",
            icon: <TableViewIcon />,
          },
          { id: "settings", label: "Settings", icon: <SettingsIcon /> },
          { id: "alerts", label: "Alerts", icon: <FeedbackIcon /> },
          { id: "reports", label: "Reports", icon: <ReportIcon /> },
        ]
      : [
          { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
          {
            id: "hierarchychartuser",
            label: "Boundaries and Scopes",
            icon: <PersonIcon />,
          },
          { id: "form", label: "Form", icon: <FormatAlignCenterIcon /> },
          {
            id: "emissionfactor",
            label: "Emission Factor",
            icon: <TableViewIcon />,
            path:"/emissionfactor-table"
          },
          { id: "support", label: "Support", icon: <SupportIcon /> },
          { id: "settings", label: "Settings", icon: <SettingsIcon /> },
        ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      elevation={3}
      sx={{
        width: 280,
        background: "#fff",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
        m: 2,
        pt: 3,
        color: "#272727",
        display: "flex",
        flexDirection: "column",
        // overflow: "hidden",      
      }}
    >
      {/* Logo Section */}
      <Box
        
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          ml: 2,
          position: "sticky", // Keeps the logo section at the top
          top: 0,
          background: "#fff", // Background color to prevent content bleed
          zIndex: 10, // Ensure it stays on top of scrolling content
          // padding: "10px 0", // Add padding for spacing
        }}
      >
        <img
          src={`${logo}`}
          alt="Zero Carbon Logo"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
          Zero Carbon
        </Typography>
      </Box>

      {/*Sidebar Items*/}
      <Box
      //  sx={{
      //   flex: 1, // Makes the list area scrollable
      //   overflowY: "auto", // Enable vertical scrolling
      // }}
      >
      <List>
        {sidebarItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Button             
              onClick={() => {
                dispatch(setSelectedItem({ id: item.id, label: item.label })); // Update selected item
                if (item.path) navigate(item.path); // Navigate to the path
                if (item.path === "/emissionfactor-table") {
                  dispatch(setSelectedItem(null)); // Clear state for separate page
                }
              }}
              sx={{
                // marginLeft:2,
                width: "90%", // Adjust the width to your desired size
                borderRadius: 4,
                backgroundColor: "transparent",
                textTransform: "none",
                color: "#000",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "15px 25px",
                "&:hover": {
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit", 
                    minWidth: "30px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <Typography variant="body1">{item.label}</Typography>
              </Box>
            </Button>
          </ListItem>
        ))}

        {/* Logout Item */}
        {/* Logout Item */}
        <ListItem disablePadding>
          <Button
            onClick={handleLogout}
            sx={{
              // marginLeft: 2,
              width: "90%", 
              borderRadius: 4,
              backgroundColor: "transparent",
              textTransform: "none",
              color: "#000",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "15px 25px",
              "&:hover": {
                backgroundColor: "#4CAF50",
                color: "#fff",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit", // Match text color
                  minWidth: "30px",
                }}
              >
              <ExitToAppIcon />
              </ListItemIcon>
              <Typography variant="body1">Logout</Typography>
            </Box>
          </Button>
        </ListItem>
      </List>

      </Box>
    </Box>
  );
};

export default Sidebar;


