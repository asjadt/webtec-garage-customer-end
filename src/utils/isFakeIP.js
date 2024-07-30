export function isFakeIP(ip) {
  // Regular expression for IP address format validation
  const regex =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;

  // Check if the IP address has a valid format
  if (!regex.test(ip)) {
    console.log("invalid IP address format");
    return true; // Invalid format
  }

  // Split the IP address into parts
  //   const parts = ip.split(".").map(Number);

  // Check for private IP ranges
  //   const isPrivate =
  //     parts[0] === 10 ||
  //     (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
  //     (parts[0] === 192 && parts[1] === 168) ||
  //     parts[0] === 127 ||
  //     (parts[0] === 169 && parts[1] === 254);

  //   if (isPrivate) {
  //     console.log("private IP address");
  //     return true; // Private IP address
  //   }

  // Check for reserved IP ranges
  //   const isReserved =
  //     parts[0] === 0 ||
  //     (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) ||
  //     (parts[0] === 192 && parts[1] === 0 && parts[2] === 0) ||
  //     (parts[0] === 198 && (parts[1] === 18 || parts[1] === 19)) ||
  //     (parts[0] === 198 && parts[1] === 51 && parts[2] === 100) ||
  //     (parts[0] === 203 && parts[1] === 0 && parts[2] === 113) ||
  //     (parts[0] >= 224 && parts[0] <= 239) ||
  //     parts[0] >= 240;

  //   if (isReserved) {
  //     console.log("Reverse IP address");
  //     return true; // Reserved IP address
  //   }

  return false; // Valid public IP address
}
