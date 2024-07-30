import { getLocalIP } from "./getLocatIP";

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the Earth in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function isInRadiusDistance({ currentLocation, savedLocation, radius }) {
  console.log({ currentLocation, savedLocation, radius });

  const distance = getDistanceFromLatLonInMeters(
    currentLocation?.latitude,
    currentLocation?.longitude,
    savedLocation?.latitude,
    savedLocation?.longitude
  );
  return distance <= radius;
}
