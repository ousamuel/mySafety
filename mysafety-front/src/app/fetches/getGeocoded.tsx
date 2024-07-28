import axios from "axios";
// Forward Geocode (Convert human-readable address to coordinates):
// https://geocode.maps.co/search?q=address&api_key=66a69cbc75c2e190187769nmlde8623

// Reverse Geocode (Convert coordinates to human-readable address):
// https://geocode.maps.co/reverse?lat=latitude&lon=longitude&api_key=66a69cbc75c2e190187769nmlde8623

type AddressFromCoords = {
  address: string;
};
type CoordsFromAddress = {
  lat: string;
  lon: string;
};
export default async function getAddressFromCoords(data: AddressFromCoords) {
  const res = await getAddressMain(data);
  console.log([
    res?.data[0]["lat"],
    res?.data[0]["lon"],
    res?.data[0]["display_name"],
  ]);
}
const getAddressMain = async (data: AddressFromCoords) => {
  const res = await axios.get(
    `https://geocode.maps.co/search?q=${data.address}&api_key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`
  );
  return res;
};
