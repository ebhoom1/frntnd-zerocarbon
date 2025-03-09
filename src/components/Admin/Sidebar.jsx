import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import TableViewIcon from "@mui/icons-material/TableView";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Groups2Icon from "@mui/icons-material/Groups2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PublicIcon from "@mui/icons-material/Public";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import GavelIcon from "@mui/icons-material/Gavel";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
import { logout } from "../../redux/features/auth/authSlice";
import {
  Box,
  List,
  ListItem,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import logo from "../../assets/images/logo1.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

const Sidebar = ({ mobileOpen, setMobileOpen, toggleSidebar }) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)"); // Adjust breakpoint as needed
  const [collapsed, setCollapsed] = useState(false);
  const userType = useSelector((state) => state.auth.userType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarItems =
    userType === "admin" || userType === "superAdmin"
      ? [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: <DashboardOutlinedIcon />,
          },
          { id: "leads", label: "Clients", icon: <GroupOutlinedIcon /> },

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
          {
            id: "team",
            label: "Team",
            icon: <GroupOutlinedIcon />,
            path: "/team",
          },
          {
            id: "decarbonisation",
            label: "Decarbonisation",
            icon: <ForestOutlinedIcon />,
          },
          { id: "alerts", label: "Alerts", icon: <AnnouncementOutlinedIcon /> },
          { id: "reports", label: "Reports", icon: <SummarizeIcon /> },
        ]
      : [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: <DashboardOutlinedIcon />,
          },
          {
            id: "hierarchychartuser",
            label: "Boundaries and Scopes",
            icon: <MultilineChartIcon />,
          },
          {
            id: "form",
            label: "Data Submissions",
            icon: <GroupOutlinedIcon />,
          },
          // {
          //   id: "submissions",
          //   label: "Submissions",
          //   icon: <DescriptionOutlinedIcon />,
          // },
          {
            id: "decarbonization",
            label: "Decarbonization",
            icon: <ForestOutlinedIcon />,
            path: "/decarbonization",
          },
          {
            id: "environment",
            label: "Environment",
            icon: <PublicIcon />,
          },
          {
            id: "social",
            label: "Social Matrics",
            icon: <Diversity3Icon />,
          },
          {
            id: "governance",
            label: "Governance",
            icon: <GavelIcon />,
          },
          {
            id: "assetsrenewableproject",
            label: "Assets & RenewableProject",
            icon: <BatteryChargingFullIcon />,
          },
          { id: "report", label: "Report", icon: <SummarizeIcon /> },
          {
            id: "team",
            label: "Team",
            icon: <GroupOutlinedIcon />,
            path: "/team",
          },
         
        ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: collapsed ? 60 : 280, // Keep collapse feature for large screens
        position: isLargeScreen ? "static" : "fixed",
        left: isLargeScreen ? "unset" : mobileOpen ? 0 : "-280px",
        transition: "left 0.3s ease",
        transition: "width 0.3s ease",
        maxHeight: "100vh", // Constrain height
        overflowY: "auto", // Enable vertical scrolling
        "&::-webkit-scrollbar": { width: 6 }, // Customize scrollbar
        "&::-webkit-scrollbar-thumb": { backgroundColor: "#aaa", borderRadius: 3 },
        zIndex: isLargeScreen ? "auto" : 1200, // Ensure overlay for small screens
        background: "#fff",
        boxShadow: isLargeScreen
          ? "2px 0 5px rgba(0, 0, 0, 0.1)"
          : "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Logo and Collapse Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        {!collapsed && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
              Zero Carbon
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={mobileOpen ? toggleSidebar : () => setCollapsed(!collapsed)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Sidebar Items */}
      <List>
        {sidebarItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Tooltip title={collapsed ? item.label : ""} placement="right">
              <Button
                onClick={() => {
                  if (item.path) {
                    navigate(item.path);
                  }
                  dispatch(setSelectedItem({ id: item.id, label: item.label }));
                  setMobileOpen(!mobileOpen);
                }}
                sx={{
                  width: "100%",
                  borderRadius: 0,
                  justifyContent: collapsed ? "center" : "flex-start",
                  textTransform: "none",
                  color: "#000",
                  padding: collapsed ? "10px 0" : "15px 25px",
                  "&:hover": {
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    "& .MuiSvgIcon-root": {
                      color: "#fff", // Change icon color on hover
                    },
                    "& .sidebar-label": {
                      color: "#fff", // Change label color on hover
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4CAF50", // Default icon color
                    textAlign:"left"
                  }}
                >
                  {item.icon}
                  {!collapsed && (
                    <Typography
                      variant="body1"
                      className="sidebar-label"
                      sx={{ marginLeft: 2 }}
                    >
                      {item.label}
                    </Typography>
                  )}
                </Box>
              </Button>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      {/* Logout Button */}
      <ListItem disablePadding>
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <Button
            onClick={handleLogout}
            sx={{
              width: "100%",
              borderRadius: 0,
              justifyContent: collapsed ? "center" : "flex-start",
              textTransform: "none",
              color: "#000",
              padding: collapsed ? "10px 0" : "15px 25px",
              "&:hover": {
                backgroundColor: "#4CAF50",
                color: "#fff",
                "& .MuiSvgIcon-root": {
                  color: "#fff", // Change icon color on hover
                },
                "& .sidebar-label": {
                  color: "#fff", // Change label color on hover
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4CAF50", // Default icon color (same as other icons)
              }}
            >
              <ExitToAppIcon />
            </Box>
            {!collapsed && (
              <Typography
                variant="body1"
                className="sidebar-label"
                sx={{ marginLeft: 2 }}
              >
                Logout
              </Typography>
            )}
          </Button>
        </Tooltip>
      </ListItem>
    </Box>
  );
};

export default Sidebar;
