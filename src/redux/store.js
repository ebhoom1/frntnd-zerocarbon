import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/UserSlice'; 
import sidebarReducer from "./features/sidebar/SidebarSlice";
import dashboardReducer from './features/dashboard/DashboardSlice';
import flowchartReducer from "./features/flowchart/flowchartSlice";
import userGetReducer from './features/user/userGetReducer';
import userRoadmapReducer from './features/roadmap/UserRoadmapSlice';
import mobileCombustionEmissionsReducer from './features/emissionCalculation/mobileCombustionEmissionSlice';
import stationaryCombustionEmissionsReducer from './features/emissionCalculation/stationaryCombustionEmissionSlice';
import industrialProcessesEmissionsReducer from './features/emissionCalculation/industrialProcessesEmissionSlice';
import fugitiveEmissionsReducer from './features/emissionCalculation/fugitiveEmissionSlice';
import totalEmissionReducer from "./features/emissionCalculation/totalEmissionSlice";
import purchasedElectricityReducer from './features/emissionCalculation/purchasedElectricitySlice';
import purchasedSteamHeatCoolingEmissionReducer from './features/emissionCalculation/PurchasedSteamHeatCoolingEmissionSlice';
import totalScope2EmissionReducer from './features/emissionCalculation/totalEmissionScope2Slice';
import purchasedGoodsServicesReducer from './features/emissionCalculation/purchasedGoodsServicesSlice';
import useSoldProductEmissionsReducer from './features/emissionCalculation/useSoldProductEmissionSlice';
import endOfLifeTreatmentReducer from './features/emissionCalculation/endOfLifeTreatmentSlice';
import totalEmissionScope3Reducer from './features/emissionCalculation/totalEmissionScope3Slice';
import simulationReducer from './features/roadmap/EmissionsSimulation';
import renewableReducer from './features/roadmap/renewableEnergySlice';
import waterReducer from './features/emsData/waterConsumptionAdditionalData';
import energyReducer from './features/emsData/energyConsumptionData';
import companyScopeReducer from './features/dashboard/adminDashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, 
    sidebar: sidebarReducer,
    dashboard: dashboardReducer,
    flowchart: flowchartReducer,
    userFetch: userGetReducer,
    userRoadmap:userRoadmapReducer,
    mobileCombustionEmissions:mobileCombustionEmissionsReducer,
    stationaryCombustionEmissions:stationaryCombustionEmissionsReducer,
    industrialProcessesEmissions:industrialProcessesEmissionsReducer,
    fugitiveEmissions:fugitiveEmissionsReducer,
    totalEmission: totalEmissionReducer,
    purchasedElectricity:purchasedElectricityReducer,
    purchasedSteamHeatCoolingEmission:purchasedSteamHeatCoolingEmissionReducer,
    totalScope2Emission:totalScope2EmissionReducer,
    purchasedGoodsServices:purchasedGoodsServicesReducer,
    useSoldProductEmissions:useSoldProductEmissionsReducer,
    endOfLifeTreatment:endOfLifeTreatmentReducer,
    totalEmissionScope3:totalEmissionScope3Reducer,
    simulation:simulationReducer,
    renewable:renewableReducer,
    water:waterReducer,
    energy:energyReducer,
    companyScope:companyScopeReducer
  },
});













