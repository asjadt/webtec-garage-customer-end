import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import AuthenticationPublicLayout from "./layout/AuthenticationPublicLayout";
import PublicContainer from "./layout/PublicContainer";
import ChangePassword from "./pages/Auth/ChangePassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import GarageList from "./pages/Garage/GarageList";
import SingleGarage from "./pages/Garage/SingleGarage";
import Home from "./pages/Home/Home";
import ManagerLayout from "./layout/ManagerLayout";

const App = () => (
  <Router>
    <Routes>
      {/* NOT FOUND PAGE (404) */}
      <Route path="*" element={<NotFound />} />
      {/* PUBLIC ROUTES  */}
      <Route path="/" element={<PublicContainer />}>
        {/* HOME  */}
        <Route index element={<Home />} />

        {/* GARAGES  */}
        <Route path="garages" element={<GarageList />} />
        <Route path="view-garage/:encID" element={<SingleGarage />} />

        {/* BOOKING  */}
        <Route path="book-now/:encID" element={<Home />} />
        <Route path="book-package/:encID" element={<Home />} />

        {/* PACKAGE  */}
        <Route path="package/:encID" element={<Home />} />

        {/* FUEL STATION  */}
        <Route path="fuel-station" element={<Home />} />
        <Route path="view-fuel-station-details/:encID" element={<Home />} />

        {/* AUTH  */}
        <Route path="reset-password" element={<Home />} />
      </Route>

      {/* PRIVATE ROUTES
      {/* DASHBOARD  */}
      <Route
        path="/my-account"
        element={
          <ManagerLayout>
            <Dashboard />
          </ManagerLayout>
        }
      />
      {/* RATING  */}
      <Route
        path="/rating/:garageId/:string_id"
        element={
          <ManagerLayout>
            <Dashboard />
          </ManagerLayout>
        }
      />

      {/* AUTHENTICATION RELATED ROUTES  */}
      <Route path="auth" element={<AuthenticationPublicLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
