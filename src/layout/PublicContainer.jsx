import { AuthProvider } from "../context/AuthContextV2";
import { DataContextProvider } from "../context/DataContext";
import { GeoLocationDataContextProvider } from "../context/GeoLocationDataContext";
import { NavProvider } from "../context/NavContext";
import { PermissionProvider } from "../context/PermissionContext";
import PublicLayout from "./PublicLayout";

export default function PublicContainer() {
  return (
    <GeoLocationDataContextProvider>
      <DataContextProvider>
        <AuthProvider>
          <PermissionProvider>
            <NavProvider>
              <PublicLayout />
            </NavProvider>
          </PermissionProvider>
        </AuthProvider>
      </DataContextProvider>
    </GeoLocationDataContextProvider>
  );
}
