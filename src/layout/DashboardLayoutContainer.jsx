// ===========================================
// #00107
// ===========================================

import { AuthProvider } from "../context/AuthContextV2";
import { GeoLocationDataContextProvider } from "../context/GeoLocationDataContext";
import { NavProvider } from "../context/NavContext";
import { PermissionProvider } from "../context/PermissionContext";
import DashboardLayout from "./DashboardLayout";

export default function DashboardLayoutContainer() {
  return (
    <AuthProvider>
      <NavProvider>
        <GeoLocationDataContextProvider>
          <PermissionProvider>
            <DashboardLayout />
          </PermissionProvider>
        </GeoLocationDataContextProvider>
      </NavProvider>
    </AuthProvider>
  );
}
