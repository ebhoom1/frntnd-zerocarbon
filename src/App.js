import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/Protectedroute/ProtectedRoute";
import Formdetails from "./components/Admin/Formdetails";
import UserDashboard from "./pages/User/UserDashboard";
import SampleFlowchart from "./pages/Admin/sampleFlowchart/sampleFlowchart";
import GetEmissionFactorTable from "./components/EmssionFactor/GetEmissionFactorTable";
import EmissionFactorTable from "./components/EmssionFactor/EmissionFactorTable";
import EmissionFactor from "./pages/Emissionfactor/EmissionFactor";
import GWP from "./pages/GWP/GWP";
import LeadsTable from "./components/Admin/LeadsTable";
import ActiveUsers from "./pages/RegisteredClients/ActiveUsers";
import FuelCombustion from "./pages/FuelCombustion/FuelCombustion";
import CountryEmissionFactor from "./pages/CountryEmissionFactor/CountryEmissionFactor";
import MobileCombustion from './pages/MobileCombustion/MobileCombustion';
import IndustralProcesses from './pages/IndustryProcess/IndustrialProcesses';
import FugitiveEmissions from './pages/FugitiveEmissions/FugitiveEmissions';
import PurchasedGoodsServices from './pages/purchasedGoogsServices/PurchasedGoodsServices';
import EndofLifeTreatment from './pages/EndofLifeTreatment/EndofLifeTreatment';
import UseSoldProducts from "./pages/UseSoldProducts/UseSoldProducts";
import TeamPage from './pages/Admin/TeamPage/TeamPage';
import DecarbonizationPage from './pages/Decarbonization/DecarbonisationPage';
import DecarbonizationBackground from "./pages/Decarbonization/DecarbonizationBackground";
const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default Route: Redirect based on user type */}
        <Route
          path="/"
          element={
            token ? (
              user?.userType === "admin" || user?.userType === "superAdmin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<UserDashboard />} />
          <Route
            path="/emissionfactor-table"
            element={<EmissionFactorTable />}
          />
          <Route
            path="/decarbonization"
            element={<DecarbonizationPage />}
          />
      <Route path="/team" element={<TeamPage />} />

        </Route>
        <Route
          element={<ProtectedRoute allowedRoles={["admin", "superAdmin"]} />}
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="flowchart/:userId" element={<SampleFlowchart />} />
          <Route path="/formdetails/:formId" element={<Formdetails />} />
          <Route
            path="/adminemissionfactor-table"
            element={<GetEmissionFactorTable />}
          />
          <Route path="/adminemissionfactor" element={<EmissionFactor />} />
          {/* <Route path="/gwp-table" element={<GWP />} /> */}
          {/* <Route path="/fuelcombustion" element={<FuelCombustion />} /> */}
          <Route
            path="/electricityemissionfactor"
            element={<CountryEmissionFactor />}
          />
          <Route path='/mobilecombustion' element={<MobileCombustion/>} />
          <Route path="/industrialprocesses" element={<IndustralProcesses/>} />
          <Route path="/fugitiveemissions" element={<FugitiveEmissions/>}/>
          <Route path="/purchasedgoods-services" element={<PurchasedGoodsServices/>}/>
          <Route path="/endoflifetreatment" element={<EndofLifeTreatment/>}/> 
          <Route path="/usesoldproducts" element={<UseSoldProducts/>}/> 
          <Route path="/registeredusers" element={<LeadsTable />} />
          <Route path="/activeusers" element={<ActiveUsers />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<div>"Page Not Found..."</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
