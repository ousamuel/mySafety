import axios from "axios";

type SearchBy = {
  zipcode: string;
  city: string;
  state: string;
  // lat: number;
  // lon: number;
  // radius: number;
};
export default function getOffenders(data: SearchBy) {
  const options = {
    method: "GET",
    url: "https://sex-offenders.p.rapidapi.com/sexoffender",
    params: {
      // firstName: "Joseph",
      // lastName: "Nigro",
      //   zipcode: data.zipcode,
      zipcode: data.zipcode,
      city: data.city,
      state: data.state,
      // lat: data.lat,
      // lon: data.lon,
      // radius: data.radius,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      "x-rapidapi-host": "sex-offenders.p.rapidapi.com",
    },
  };

  try {
    const response = axios.request(options);
    return response;
  } catch (error) {
    console.log("error fetching offenders:", error);
  }
}
