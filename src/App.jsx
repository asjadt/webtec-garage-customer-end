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

import DashboardLayoutContainer from "./layout/DashboardLayoutContainer";
import MyBooking from "./pages/Dashboard/MyBooking/MyBooking";
import MyJob from "./pages/Dashboard/MyJob/MyJob";
import Notification from "./pages/Dashboard/Notification/Notification";
import PendingJob from "./pages/Dashboard/PendingJob/PendingJob";
import Rating from "./pages/Dashboard/Ratting/Rating";
import GarageBooking from "./pages/Garage/GarageBooking";
import GarageBookingWIthPackage from "./pages/Garage/GarageBookingWIthPackage";
import FuelStation from "./pages/FuelStation/FuelStation";
import Profile from "./pages/Profile/Profile";
import FuelStationDetails from "./pages/FuelStation/Components/FuelStationDetails";

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
        <Route path="view-garage/:encID/:tabName" element={<SingleGarage />} />

        {/* BOOKING  */}
        <Route path="booking/:encID" element={<GarageBooking />} />
        <Route
          path="booking-with-package/:encID"
          element={<GarageBookingWIthPackage />}
        />

        {/* FUEL STATION  */}
        <Route path="fuel-station" element={<FuelStation />} />
        <Route
          path="view-fuel-station-details/:encID"
          element={<FuelStationDetails />}
        />

        {/* AUTH  */}
        <Route path="reset-password" element={<Home />} />
      </Route>

      {/* PRIVATE ROUTES
      {/* DASHBOARD  */}
      <Route path="/my-account" element={<DashboardLayoutContainer />}>
        {/* DASHBOARD  */}
        <Route index element={<Dashboard />} />

        {/* PROFILE  */}
        <Route path="profile" element={<Profile />} />

        {/* NOTIFICATIONS  */}
        <Route path="all-notifications" element={<Notification />} />

        {/* MY BOOKINGS  */}
        <Route path="my-bookings" element={<MyBooking />} />

        {/* MY JOBS  */}
        <Route path="my-jobs" element={<MyJob />} />

        {/* MY PENDING JOBS  */}
        <Route path="pending-jobs" element={<PendingJob />} />

        {/* RATTING  */}
        <Route path="ratting/:encGarageID/:encJobID" element={<Rating />} />

        {/* CHANGE PASSWORD  */}
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      {/* RATING  */}
      <Route
        path="/rating/:garageId/:string_id"
        element={
          <DashboardLayoutContainer>
            <Dashboard />
          </DashboardLayoutContainer>
        }
      />

      {/* AUTHENTICATION RELATED ROUTES  */}
      <Route path="auth" element={<AuthenticationPublicLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="reset-password" element={<ChangePassword />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
