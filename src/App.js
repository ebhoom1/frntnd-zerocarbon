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
import ActiveUsers from "./pages/Admin/StatusCompletedUser/ActiveUsers";
import FuelCombustion from "./pages/FuelCombustion/FuelCombustion";
import CountryEmissionFactor from "./pages/CountryEmissionFactor/CountryEmissionFactor";
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
          <Route path="/gwp-table" element={<GWP />} />
          <Route path="/fuelcombustion" element={<FuelCombustion />} />
          <Route
            path="/electricityemissionfactor"
            element={<CountryEmissionFactor />}
          />
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
