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

interface ArticleData {
  link: string;
  photo_url: string;
  snippet: string;
  source_url: string;
  title: string;
}

interface SearchFormValues {
  query: string;
  time_published: string;
}

const LatestNews: React.FC = () => {
  const [newRender, setNewRender] = useState<boolean>(true);
  const [latestNews, setLatestNews] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentSearch, setCurrentSearch] = useState<string[]>([]);
  const itemsPerPage = 6;

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
  .filter(article => article.photo_url) 
  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <main>
      <h1 className="px-4 font-bold text-center">
        Latest News from <strong className="underline">Anywhere</strong>
      </h1>
      <h4 className="px-2 text-gray-500 text-center text-sm">
        Search for any news in the past year
      </h4>
      <div className="middle-colored-bar py-2 mt-4 flex flex-wrap justify-evenly items-center">
        <form
          className="flex flex-col w-1/2 text-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="offender-input"
            {...register("query", { required: true })}
            placeholder="Search"
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

      <div className="sub-container mt-5">
        <div className="flex justify-between pl-1 pr-3 mb-3">
          <Pagination
            total={totalPages}
            color="primary"
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
          {currentSearch.length > 0 && (
            <span className='uppercase'>SEARCHING FOR: {currentSearch.join(" ")}</span>
          )}
          <p className="text-small text-default-500 text-center">
            {totalPages ? `${currentPage} / ${totalPages}` : null}
          </p>
        </div>
      </div>
      <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8">
        {currentItems.map((article, i) => (
          <Card key={i} className="col-span-12 lg:col-span-4 rounded-[5px] ">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <a
                href={article.source_url}
                target="_blank"
                className="flex text-center text-tiny text-white/60 uppercase font-bold py-1 px-2 hover:bg-gray-300 hover:text-blue-600"
              >
                {article.source_url}
              </a>
              <h4 className="px-2 text-white font-medium text-large stroked">
                {article.title}
              </h4>
            </CardHeader>
            <a
              href={article.source_url}
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
            <CardBody className="bg-gray-200">
              <p className="p-2">{article.snippet}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default LatestNews;
