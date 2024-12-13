import React from "react";
import { useSelector , useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import LeadsTable from './LeadsTable';
import UserTable from "../../pages/Admin/userTableForflowchartView/UserTable";
import FlowchartUser from '../../components/User/flowchart/FlowchartUser.jsx';
import UserForm from '../../pages/User/UserForm';
import EmissionFactor from "../../pages/Emissionfactor/EmissionFactor.jsx";
import pic from '../../assets/images/pic.jpeg';
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { setSelectedItem } from "../../redux/features/sidebar/SidebarSlice";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const ContentArea = () => {
  const selectedItem = useSelector((state) => state.sidebar.selectedItem);
  const userType = useSelector((state) => state.auth.userType);
  const location = useLocation();
  const dispatch = useDispatch();
  console.log("userType:",userType);


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
          return <Dashboard/>;
        case "leads":
          return <LeadsTable/>;
        case "hierarchychart":
          return <UserTable/>;
        case "emissionfactormanagement":
          return <EmissionFactor/>;
        default:
          return <Dashboard/>;          
      }
    } else {
      switch (selectedItem.id) {
        case "dashboard":
          return ;
        case "hierarchychartuser":
          return <FlowchartUser/>;
        case "form":
          return <UserForm/>;        
        case "support":
          return ;
        case "settings":
          return ;
        default:
          return  ;
      }
    }
  };

  

  return (
    <div style={{ flex: 1, padding: 20, overflow: "auto" }}>    
      <Box
        sx={{
          mb: 3,
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
          <Avatar src={`${pic}`} />
          <Box>
            <Typography fontWeight="bold">Ferra Alexandra</Typography>
            <Typography variant="body2" color="text.secondary">
             {userType==="admin" || userType==="superAdmin"?"Admin":"User"}
            </Typography>
          </Box>
        </Box>
      </Box>
    
      {renderContent()}
    </div>
  );
};

export default ContentArea;
