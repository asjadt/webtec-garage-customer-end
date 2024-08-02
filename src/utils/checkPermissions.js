export const checkPermissions = (
  permissionForCheck,
  permissions,
  requireAll = false
) => {
  if (permissions) {
    if (requireAll) {
      return permissionForCheck?.every((el) => permissions.includes(el));
    } else {
      return permissionForCheck?.some((el) => permissions.includes(el));
    }
  }
};
