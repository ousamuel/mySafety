import axios from "axios";

type SearchBy = {
    bottom_left: string,
    top_right: string
};
export default function getTraffic(data:SearchBy) {
    const options = {
      method: 'GET',
      url: 'https://waze.p.rapidapi.com/alerts-and-jams',
      params: {
        bottom_left: '40.66615391742187,-74.13732147216798',
        top_right: '40.772787404902594,-73.76818084716798',
        max_alerts: '20',
        max_jams: '20'
      },
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'x-rapidapi-host': 'waze.p.rapidapi.com'
      }
    };
    
    try {
        const response =  axios.request(options);
        return response
    } catch (error) {
        console.log("error fetching traffic:", error);
    }

}
