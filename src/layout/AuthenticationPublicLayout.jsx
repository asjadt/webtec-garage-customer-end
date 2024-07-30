// ===========================================
// #00105
// ===========================================

import { Outlet } from "react-router-dom";

import { PermissionProvider } from "../context/PermissionContext";

export default function AuthenticationPublicLayout() {
  return (
    <PermissionProvider>
      <Outlet />
    </PermissionProvider>
  );
}
