import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/UserSlice'; 
import sidebarReducer from "./features/sidebar/SidebarSlice";
import dashboardReducer from './features/dashboard/DashboardSlice';
import flowchartReducer from "./features/flowchart/flowchartSlice";
import userGetReducer from './features/user/userGetReducer';
import userRoadmapReducer from './features/roadmap/UserRoadmapSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, 
    sidebar: sidebarReducer,
    dashboard: dashboardReducer,
    flowchart: flowchartReducer,
    userFetch: userGetReducer,
    userRoadmap:userRoadmapReducer,

  },
});













