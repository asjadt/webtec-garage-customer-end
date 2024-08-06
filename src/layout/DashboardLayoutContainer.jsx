// ===========================================
// #00107
// ===========================================

import { AuthProvider } from "../context/AuthContextV2";
import { DataContextProvider } from "../context/DataContext";
import { GeoLocationDataContextProvider } from "../context/GeoLocationDataContext";
import { NavProvider } from "../context/NavContext";
import { PermissionProvider } from "../context/PermissionContext";
import DashboardLayout from "./DashboardLayout";

export default function DashboardLayoutContainer() {
  return (
    <DataContextProvider>
      <AuthProvider>
        <PermissionProvider>
          <NavProvider>
            <GeoLocationDataContextProvider>
              <DashboardLayout />
            </GeoLocationDataContextProvider>
          </NavProvider>
        </PermissionProvider>
      </AuthProvider>
    </DataContextProvider>
  );
}
