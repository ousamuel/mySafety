"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import getLatestNews from "../fetches/getNews";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
interface ArticleData {
  link: string;
  photo_url: string;
  snippet: string;
  source_url: string;
  title: string;
  published_datetime_utc: string;
}

interface SearchFormValues {
  query: string;
  time_published: string;
}

const LatestNews: React.FC = () => {
  // console.log(9/5)
  let tempData = [
    {
      link: "https://www.theguardian.com/us-news/donald-trump-pennsylvania-rally-shooting",
      photo_url:
        "https://i.guim.co.uk/img/media/b2c881817a669efca74b8e01e013d290918515bd/0_357_5388_3233/master/5388.jpg?width=240&dpr=1&s=none",
      published_datetime_utc: "2024-07-28T16:58:45.000Z",
      snippet:
        "A spoof after the Trump assassination attempt shows the eye to hazard needed on heavy news days. Elisabeth Ribbans. 10.58 EDT ...",
      source_logo_url:
        "https://lh3.googleusercontent.com/H7OqHduLCFtIIGKjSozuaSYbttMMfNobl21BBVmCECo50wt6yMCOKTyNniViXVqhIgF0olTx",
      source_url: "https://www.theguardian.com",
      title: "Donald Trump Pennsylvania rally shooting",
    },
    {
      link: "https://www.theguardian.com/us-news/donald-trump-pennsylvania-rally-shooting",
      photo_url:
        "https://i.guim.co.uk/img/media/b2c881817a669efca74b8e01e013d290918515bd/0_357_5388_3233/master/5388.jpg?width=240&dpr=1&s=none",
      published_datetime_utc: "2024-07-28T16:58:45.000Z",
      snippet:
        "A spoof after the Trump assassination attempt shows the eye to hazard needed on heavy news days. Elisabeth Ribbans. 10.58 EDT ...",
      source_logo_url:
        "https://lh3.googleusercontent.com/H7OqHduLCFtIIGKjSozuaSYbttMMfNobl21BBVmCECo50wt6yMCOKTyNniViXVqhIgF0olTx",
      source_url: "https://www.theguardian.com",
      title: "Donald Trump Pennsylvania rally shooting",
    },
    {
      link: "https://www.theguardian.com/us-news/donald-trump-pennsylvania-rally-shooting",
      photo_url:
        "https://i.guim.co.uk/img/media/b2c881817a669efca74b8e01e013d290918515bd/0_357_5388_3233/master/5388.jpg?width=240&dpr=1&s=none",
      published_datetime_utc: "2024-07-28T16:58:45.000Z",
      snippet:
        "A spoof after the Trump assassination attempt shows the eye to hazard needed on heavy news days. Elisabeth Ribbans. 10.58 EDT ...",
      source_logo_url:
        "https://lh3.googleusercontent.com/H7OqHduLCFtIIGKjSozuaSYbttMMfNobl21BBVmCECo50wt6yMCOKTyNniViXVqhIgF0olTx",
      source_url: "https://www.theguardian.com",
      title: "Donald Trump Pennsylvania rally shooting",
    },
    {
      link: "https://www.theguardian.com/us-news/donald-trump-pennsylvania-rally-shooting",
      photo_url:
        "https://i.guim.co.uk/img/media/b2c881817a669efca74b8e01e013d290918515bd/0_357_5388_3233/master/5388.jpg?width=240&dpr=1&s=none",
      published_datetime_utc: "2024-07-28T16:58:45.000Z",
      snippet:
        "A spoof after the Trump assassination attempt shows the eye to hazard needed on heavy news days. Elisabeth Ribbans. 10.58 EDT ...",
      source_logo_url:
        "https://lh3.googleusercontent.com/H7OqHduLCFtIIGKjSozuaSYbttMMfNobl21BBVmCECo50wt6yMCOKTyNniViXVqhIgF0olTx",
      source_url: "https://www.theguardian.com",
      title: "Donald Trump Pennsylvania rally shooting",
    },
    {
      link: "https://www.theguardian.com/us-news/donald-trump-pennsylvania-rally-shooting",
      photo_url:
        "https://i.guim.co.uk/img/media/b2c881817a669efca74b8e01e013d290918515bd/0_357_5388_3233/master/5388.jpg?width=240&dpr=1&s=none",
      published_datetime_utc: "2024-07-28T16:58:45.000Z",
      snippet:
        "A spoof after the Trump assassination attempt shows the eye to hazard needed on heavy news days. Elisabeth Ribbans. 10.58 EDT ...",
      source_logo_url:
        "https://lh3.googleusercontent.com/H7OqHduLCFtIIGKjSozuaSYbttMMfNobl21BBVmCECo50wt6yMCOKTyNniViXVqhIgF0olTx",
      source_url: "https://www.theguardian.com",
      title: "Donald Trump Pennsylvania rally shooting",
    },
    {
      link: "https://www.theguardian.com/us-news/donald-trump-pennsylvania-rally-shooting",
      photo_url:
        "https://i.guim.co.uk/img/media/b2c881817a669efca74b8e01e013d290918515bd/0_357_5388_3233/master/5388.jpg?width=240&dpr=1&s=none",
      published_datetime_utc: "2024-07-28T16:58:45.000Z",
      snippet:
        "A spoof after the Trump assassination attempt shows the eye to hazard needed on heavy news days. Elisabeth Ribbans. 10.58 EDT ...",
      source_logo_url:
        "https://lh3.googleusercontent.com/H7OqHduLCFtIIGKjSozuaSYbttMMfNobl21BBVmCECo50wt6yMCOKTyNniViXVqhIgF0olTx",
      source_url: "https://www.theguardian.com",
      title: "Donald Trump Pennsylvania rally shooting",
    },
    {
      link: "https://www.theguardian.com/us-news/donald-trump-pennsylvania-rally-shooting",
      photo_url:
        "https://i.guim.co.uk/img/media/b2c881817a669efca74b8e01e013d290918515bd/0_357_5388_3233/master/5388.jpg?width=240&dpr=1&s=none",
      published_datetime_utc: "2024-07-28T16:58:45.000Z",
      snippet:
        "A spoof after the Trump assassination attempt shows the eye to hazard needed on heavy news days. Elisabeth Ribbans. 10.58 EDT ...",
      source_logo_url:
        "https://lh3.googleusercontent.com/H7OqHduLCFtIIGKjSozuaSYbttMMfNobl21BBVmCECo50wt6yMCOKTyNniViXVqhIgF0olTx",
      source_url: "https://www.theguardian.com",
      title: "Donald Trump Pennsylvania rally shooting",
    },
  ];
  const [newRender, setNewRender] = useState<boolean>(true);
  const [latestNews, setLatestNews] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentSearch, setCurrentSearch] = useState<string[]>([]);
  const itemsPerPage = 5;

  const fetchLatestNews = async (input: SearchFormValues) => {
    try {
      const res = await getLatestNews(input);
      setLatestNews(res || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SearchFormValues>();

  const validateForm = (data: SearchFormValues) => {
    return data.query && data.time_published;
  };

  const onSubmit: SubmitHandler<SearchFormValues> = async (data) => {
    if (!validateForm(data)) {
      return;
    }
    setNewRender(false);
    setLatestNews([]);
    setLoading(true);
    setCurrentSearch([data.query, data.time_published]);
    await fetchLatestNews(data);
    setCurrentPage(1);
    reset();
  };

  useEffect(() => {
    setNewRender(true);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(latestNews.length / itemsPerPage));
  }, [latestNews]);

  const currentItems = latestNews
    .filter((article) => article.photo_url)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className='items-center'>
      <h1 className="px-4 font-bold text-center">
        Latest News from <strong className="underline">Anywhere</strong>
      </h1>
      <h4 className="px-2 text-gray-500 text-center text-sm">
        Search for any news in the US up to the past year
      </h4>
      <div className="middle-colored-bar py-2 mt-4 flex flex-wrap justify-evenly items-center">
        <form
          className="flex flex-col w-1/2 text-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="offender-input"
            {...register("query", { required: true })}
            placeholder="Enter Your Search"
          />
          {errors.query && <span>This field is required</span>}

          <Controller
            name="time_published"
            control={control}
            defaultValue="1h"
            render={({ field }) => (
              <select {...field} className="offender-input">
                <option value="1h">Select...</option>
                <option value="anytime">Anytime</option>
                <option value="1h">1 Hour</option>
                <option value="1d">24 Hours</option>
                <option value="7d">1 week</option>
                <option value="1y">1 year</option>
              </select>
            )}
          />
          {errors.time_published && <span>This field is required</span>}

          <input
            className="submit-input mt-[5px]"
            type="submit"
            value="Search"
          />
        </form>
      </div>

      <div className="sub-container mt-5 mx-auto">
        <div className="flex justify-between pl-1 pr-3 mb-2 flex-wrap">
          <Pagination
            total={totalPages}
            className=""
            color="primary"
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
          {currentSearch.length == 0 && (
            <span className="uppercase my-auto searching-for">
              SEARCHING FOR:{" "}
              <strong className="">
                "{currentSearch[0]}" ({currentSearch[1]})
              </strong>
            </span>
          )}
          <p className="text-small text-default-500 text-center my-auto">
            {totalPages ? `${currentPage} / ${totalPages}` : null}
          </p>
        </div>
      </div>
      {newRender ? (
        <div className="flex flex-col text-center items-center">
          <h3 className="my-2 text-gray-500">
            Enter a news topic in a specific timeframe
          </h3>
          {/* <Image
              src="svgs/search.svg"
              alt="search-svg"
              width={100}
              height={100}
            /> */}
        </div>
      ) : !loading && latestNews.length == 0 ? (
        <div className="flex flex-col items-center text-center">
          <h3 className="my-4">No news found for this topic </h3>
          <Image src="svgs/news.svg" alt="news-svg" width={80} height={100} />
          <h4>Feel free to search again</h4>
        </div>
      ) : null}
      <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8 max-w-[1600px] m-auto">
        {/* tempData to avoid fetches */}
        {tempData.map((article, i) => (
          <Card
            key={i}
            // className="col-span-12 lg:col-span-4 rounded-[5px] hover:shadow-2xl hover:opacity-60 m-4 "
            className={`${
              i % 5 === 0 || i % 5 === 1 || i % 5 === 2
                ? "col-span-12 md:col-span-4 rounded-[5px] hover:shadow-2xl hover:opacity-60 m-2"
                : "col-span-12 md:col-span-6 rounded-[5px] hover:shadow-2xl hover:opacity-60 m-2"
            }`}
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-end">
              <a
                href={article.link}
                target="_blank"
                className="flex text-center text-tiny text-black/60 uppercase font-bold py-1 px-2 bg-gray-100 opacity-75"
              >
                {article.published_datetime_utc.slice(0, 10)}
              </a>
            </CardHeader>
            <a
              href={article.link}
              className="z-0 w-full h-full object-cover"
              target="_blank"
            >
              {" "}
              <img
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={article.photo_url}
              />
            </a>
            <a href={article.link} target="_blank">
              <CardBody className="bg-gray-200 py-1">
                <h4 className="border-b border-black mx-2 py-1 text-center font-medium ">
                  {article.title}
                </h4>
                <p className="p-2 text-sm">{article.snippet}</p>
              </CardBody>
            </a>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default LatestNews;
