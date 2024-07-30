// ===========================================
// #00107
// ===========================================

import { GeoLocationDataContextProvider } from "../context/GeoLocationDataContext";
import { NavProvider } from "../context/NavContext";
import { PermissionProvider } from "../context/PermissionContext";
import DashboardLayout from "./DashboardLayout";

export default function ManagerLayout() {
  return (
    <NavProvider>
      <GeoLocationDataContextProvider>
        <PermissionProvider>
          <DashboardLayout />
        </PermissionProvider>
      </GeoLocationDataContextProvider>
    </NavProvider>
  );
}
