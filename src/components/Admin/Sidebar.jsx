// import React from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
// import MultilineChartIcon from "@mui/icons-material/MultilineChart";
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import FeedbackIcon from "@mui/icons-material/Feedback";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import SupportIcon from "@mui/icons-material/Support";
// import TableViewIcon from '@mui/icons-material/TableView';
// import GroupIcon from '@mui/icons-material/Group';
// import Groups2Icon from '@mui/icons-material/Groups2';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
// import { logout } from "../../redux/features/auth/authSlice";
// import {
//   ListItemIcon,
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider,
//   Typography,
//   Button,
// } from "@mui/material";
// import logo from "../../assets/images/logo1.svg";

// const Sidebar = () => {
//   const userType = useSelector((state) => state.auth.userType);
//   console.log("userType:", userType);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const sidebarItems =
//     userType === "admin" || userType === "superAdmin"
//       ? [
//           { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//           { id: "leads", label: "Clients", icon: <GroupIcon /> },
//           { id: "submissions", label: "Submissions", icon: <GroupIcon /> },
//           {
//             id: "hierarchychart",
//             label: "Boundaries and Scopes",
//             icon: <MultilineChartIcon />,
//           },
//           {
//             id: "emissionfactormanagement",
//             label: "Emission Factors",
//             icon: <TableViewIcon />,
//           },
//           { id: "settings", label: "Settings", icon: <SettingsIcon /> },
//           { id: "alerts", label: "Alerts", icon: <FeedbackIcon /> },
//           { id: "reports", label: "Reports", icon: <SummarizeIcon/> },
//         ]
//       : [
//           { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//           {
//             id: "hierarchychartuser",
//             label: "Boundaries and Scopes",
//             icon: <MultilineChartIcon />,
//           },
//           { id: "form", label: "Data Submissions", icon: <FormatAlignCenterIcon /> },
//           {
//             id: "emissionfactor",
//             label: "Emission Sources",
//             icon: <TableViewIcon />,
//             path:"/emissionfactor-table"
//           },
//           { id: "support", label: "Report", icon: <SummarizeIcon /> },
//           { id: "settings", label: "Team Management", icon: <Groups2Icon /> },
//           { id: "settings", label: "Alerts & Notifications", icon: <NotificationsIcon /> },
//         ];

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <Box
//       elevation={3}
//       sx={{
//         width: 280,
//         background: "#fff",
//         boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
//         // borderRadius: 5,
//         // m: 2,
//         pt: 3,
//         color: "#272727",
//         display: "flex",
//         flexDirection: "column",
//         // overflow: "hidden",
//       }}
//     >
//       {/* Logo Section */}
//       <Box

//         sx={{
//           display: "flex",
//           alignItems: "center",
//           mb: 2,
//           ml: 2,
//           position: "sticky", // Keeps the logo section at the top
//           top: 0,
//           background: "#fff", // Background color to prevent content bleed
//           zIndex: 10, // Ensure it stays on top of scrolling content
//           // padding: "10px 0", // Add padding for spacing
//         }}
//       >
//         <img
//           src={`${logo}`}
//           alt="Zero Carbon Logo"
//           style={{ width: 50, height: 50, borderRadius: "50%" }}
//         />
//         <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
//           Zero Carbon
//         </Typography>
//       </Box>

//       {/*Sidebar Items*/}
//       <Box
//       //  sx={{
//       //   flex: 1, // Makes the list area scrollable
//       //   overflowY: "auto", // Enable vertical scrolling
//       // }}
//       >
//       <List>
//         {sidebarItems.map((item) => (
//           <ListItem key={item.id} disablePadding>
//             <Button
//               onClick={() => {
//                 dispatch(setSelectedItem({ id: item.id, label: item.label })); // Update selected item
//                 if (item.path) navigate(item.path); // Navigate to the path
//                 if (item.path === "/emissionfactor-table") {
//                   dispatch(setSelectedItem(null)); // Clear state for separate page
//                 }
//               }}
//               sx={{
//                 // marginLeft:2,
//                 width: "90%", // Adjust the width to your desired size
//                 borderRadius: 4,
//                 backgroundColor: "transparent",
//                 textTransform: "none",
//                 color: "#000",
//                 fontWeight: "bold",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "flex-start",
//                 padding: "15px 25px",
//                 "&:hover": {
//                   backgroundColor: "#4CAF50",
//                   color: "#fff",
//                 },
//                 transition: "background-color 0.3s ease",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     color: "inherit",
//                     minWidth: "30px",
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <Typography variant="body1">{item.label}</Typography>
//               </Box>
//             </Button>
//           </ListItem>
//         ))}

//         {/* Logout Item */}
//         {/* Logout Item */}
//         <ListItem disablePadding>
//           <Button
//             onClick={handleLogout}
//             sx={{
//               // marginLeft: 2,
//               width: "90%",
//               borderRadius: 4,
//               backgroundColor: "transparent",
//               textTransform: "none",
//               color: "#000",
//               fontWeight: "bold",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               padding: "15px 25px",
//               "&:hover": {
//                 backgroundColor: "#4CAF50",
//                 color: "#fff",
//               },
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   color: "inherit", // Match text color
//                   minWidth: "30px",
//                 }}
//               >
//               <ExitToAppIcon />
//               </ListItemIcon>
//               <Typography variant="body1">Logout</Typography>
//             </Box>
//           </Button>
//         </ListItem>
//       </List>

//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;

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

const Sidebar = () => {
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
            id: "submissions",
            label: "Submissions",
            icon: <GroupOutlinedIcon />,
          },
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
          { id: "settings", label: "Settings", icon: <SettingsOutlinedIcon /> },
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
          { id: "support", label: "Report", icon: <SummarizeIcon /> },
          {
            id: "settings",
            label: "Team Management",
            icon: <SettingsOutlinedIcon />,
          },
          {
            id: "alerts",
            label: "Alerts & Notifications",
            icon: <NotificationsIcon />,
          },
        ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: collapsed ? 80 : 280,
        transition: "width 0.3s ease",
        background: "#fff",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        color: "#272727",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100vh",
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
        <IconButton onClick={() => setCollapsed(!collapsed)}>
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
                  dispatch(setSelectedItem({ id: item.id, label: item.label }));
                  if (item.path) navigate(item.path);
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
                  }}
                >
                  {item.icon}
                  {!collapsed && (
                    <Typography
                      variant="body1"
                      className="sidebar-label"
                      sx={{ marginLeft: 2,  }}
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
                sx={{ marginLeft: 2, }}
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
