import axios from "axios";

type SearchBy = {
  query: string;
//   limit: string;
  time_published: string;
//   country: string;
//   lang: string;
};

export default async function getLatestNews(data: SearchBy) {
  const options = {
    method: "GET",
    url: "https://real-time-news-data.p.rapidapi.com/search",
    params: {
      query: data.query,
      limit: "50",
      time_published: data.time_published,
      country: "US",
      lang: "en",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.data)
    return response.data.data
  } catch (error) {
    console.error(error);
  }
}
