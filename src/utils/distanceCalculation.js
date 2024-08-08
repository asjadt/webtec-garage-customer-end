const distanceCalculation = (latitude, longitude, radiusKm) => {
  const earthRadiusKm = 6371.0;
  const latRad = latitude * (Math.PI / 180);

  const deltaLat = radiusKm / 111.0;
  const deltaLng = radiusKm / (111.0 * Math.cos(latRad));

  const minLat = latitude - deltaLat;
  const maxLat = latitude + deltaLat;
  const minLng = longitude - deltaLng;
  const maxLng = longitude + deltaLng;

  return {
    minLatitude: minLat,
    maxLatitude: maxLat,
    minLongitude: minLng,
    maxLongitude: maxLng,
  };
};
