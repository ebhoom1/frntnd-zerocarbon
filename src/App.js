import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/Protectedroute/ProtectedRoute";
import Formdetails from "./components/Admin/Formdetails";
import UserDashboard from "./pages/User/UserDashboard";
import SampleFlowchart from "./pages/Admin/sampleFlowchart/sampleFlowchart";
import LeadsTable from "./components/Admin/LeadsTable";
import ActiveUsers from "./pages/RegisteredClients/AddUsers";
import CountryEmissionFactor from "./pages/CountryEmissionFactor/CountryEmissionFactor";
import MobileCombustion from "./pages/MobileCombustion/MobileCombustion";
import StationaryCombustion from "./pages/StationaryCombustion/StationaryCombustion"
import IndustralProcesses from "./pages/IndustryProcess/IndustrialProcesses";
import FugitiveEmissions from "./pages/FugitiveEmissions/FugitiveEmissions";
import PurchasedGoodsServices from "./pages/purchasedGoogsServices/PurchasedGoodsServices";
import EndofLifeTreatment from "./pages/EndofLifeTreatment/EndofLifeTreatment";
import UseSoldProducts from "./pages/UseSoldProducts/UseSoldProducts";
import TeamPage from "./pages/Admin/TeamPage/TeamPage";
import DecarbonizationPage from "./pages/Decarbonization/DecarbonisationPage";
import Payment from "./pages/Payment/Payment";
import SubscriptionModal from "./components/GlobalSubscriptionModal/SubscriptionModal";
import UserForm from "./pages/User/UserForm";

const App = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  // const token = localStorage.getItem("token");
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // Check if subscription has expired
  const hasSubscriptionExpired = () => {
    if (!user || !user.subscription || !user.subscription.endDate) return false;
    const today = dayjs();
    const expiry = dayjs(user.subscription.endDate);
    return today.isAfter(expiry);
  };

  return (
    <BrowserRouter>
      {/* Display Modal Globally if any subscription has expired */}
      {/* {hasSubscriptionExpired() && <SubscriptionModal open={true} />} */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />

        {/* Default Route: Redirect based on user type */}
        <Route
          path="/"
          element={
            token ? (
              user?.userType === "admin" ||
              user?.userType === "superAdmin" ||
              user?.userType === "consultantadmin" ? (
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

          <Route path="/decarbonization" element={<DecarbonizationPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/form" element={<UserForm />} />
        </Route>
        <Route
          element={<ProtectedRoute allowedRoles={["admin", "superAdmin","consultantadmin"]} />}
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="flowchart/:userId" element={<SampleFlowchart />} />
          <Route path="/formdetails/:userId" element={<Formdetails />} />

          <Route
            path="/electricityemissionfactor"
            element={<CountryEmissionFactor />}
          />
          <Route path="/mobilecombustion" element={<MobileCombustion />} />
          <Route path="/stationarycombustion" element={<StationaryCombustion />} />
          <Route path="/industrialprocesses" element={<IndustralProcesses />} />
          <Route path="/fugitiveemissions" element={<FugitiveEmissions />} />
          <Route
            path="/purchasedgoods-services"
            element={<PurchasedGoodsServices />}
          />
          <Route path="/endoflifetreatment" element={<EndofLifeTreatment />} />
          <Route path="/usesoldproducts" element={<UseSoldProducts />} />
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
