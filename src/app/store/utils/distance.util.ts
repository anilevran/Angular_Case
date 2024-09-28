//uzaklık hesaplama
export function transformFunction(item: any, lat1: number, lon1: number) {
  const lat2 = item.storeInfo.geoLocation.latitude; 
  const lon2 = item.storeInfo.geoLocation.longitude; 

  return haversine(lat1, lon1, lat2, lon2);
}

//haversin algoritması
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const toRad = (value: any) => (value * Math.PI) / 180;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
