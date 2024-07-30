export const DistanceFromLatLong = function ({
  latitude,
  longitude,
  distance,
  bearing,
}) {
  const R = 6378.1; // Radius of the Earth
  const brng = (bearing * Math.PI) / 180; // Convert bearing to radian
  let lat = (latitude * Math.PI) / 180; // Current coords to radians
  let lon = (longitude * Math.PI) / 180;

  // Do the math magic
  lat = Math.asin(
    Math.sin(lat) * Math.cos(distance / R) +
      Math.cos(lat) * Math.sin(distance / R) * Math.cos(brng)
  );
  lon += Math.atan2(
    Math.sin(brng) * Math.sin(distance / R) * Math.cos(lat),
    Math.cos(distance / R) - Math.sin(lat) * Math.sin(lat)
  );
  return {
    latitude: (lat * 180) / Math.PI,
    longitude: (lon * 180) / Math.PI,
  };
  // Coords back to degrees and return
};
