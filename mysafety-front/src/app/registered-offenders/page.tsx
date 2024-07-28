"use client";
import React, { useEffect, useState } from "react";
import getOffenders from "../fetches/getOffenders";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Pagination, Progress } from "@nextui-org/react";
import Image from "next/image";

import { useForm, SubmitHandler } from "react-hook-form";

interface OffenderData {
  address: string;
  age: string;
  city: string;
  content: string;
  crime: string;
  dob: string | null;
  ethnicity: string;
  eyeColor: string;
  firstName: string;
  firstName_nicknames: string[];
  hairColor: string;
  height: string;
  isAbsconder: boolean | null;
  isPredator: boolean | null;
  jurisdiction: string | null;
  lastName: string;
  lat: number;
  lng: number;
  marks: string;
  middleName: string;
  name: string;
  offenderImageUrl: string;
  offenderUrl: string;
  race: string | null;
  registrationDate: string | null;
  riskLevel: string;
  sex: string;
  state: string;
  updatedAt: string;
  uuid: string;
  weight: string;
  zipcode: string;
}

interface VagueSearchFormValues {
  zipcode: string;
  city: string;
  state: string;
}

const RegisteredOffenders: React.FC = () => {
  const tempOffenderSearch = {
    zipcode: "11365",
    city: "Flushing",
    state: "New York",
  };

  const [newRender, setNewRender] = useState<boolean>(true);
  const [offenders, setOffenders] = useState<OffenderData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentSearch, setCurrentSearch] = useState<string[]>([]);
  const itemsPerPage = 5;

  const fetchOffenders = async (input: VagueSearchFormValues) => {
    try {
      const res = await getOffenders(input);
      // console.log(res?.data.offenders);
      setOffenders(res?.data.offenders || []);
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching offenders:", error);
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VagueSearchFormValues>();
  const validateForm = (data: VagueSearchFormValues) => {
    if (data.zipcode || data.city || data.state) {
      return true;
    }
    return false;
  };
  const onSubmit: SubmitHandler<VagueSearchFormValues> = async (data) => {
    if (!validateForm(data)) {
      return;
    }
    setNewRender(false);
    setOffenders([]);
    setLoading(true);
    setCurrentSearch([data.zipcode, data.city, data.state]);
    await fetchOffenders(data);
    setCurrentPage(1);
    reset();
  };
  useEffect(() => {
    setNewRender(true);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(offenders.length / itemsPerPage));
  }, [offenders]);

  const currentItems = offenders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [badZip, setBadZip] = useState<boolean>(false);
  return (
    <main>
      <h1 className="px-4 font-bold text-center">
        Find Registered Offenders Around You
      </h1>
      <h4 className="px-2 text-gray-500 text-center text-sm">
        Visit the official record to find complete information
      </h4>
      <div className="middle-colored-bar py-2 mt-4 flex flex-wrap justify-evenly items-center">
        <section id="risk-levels" className="legends-box mt-3">
          <h3 className="text-center underline">Risk Levels</h3>
          <div className="flex">
            <ul className="whitespace-nowrap mr-1 font-bold">
              <li className="text-green-500">Level 1: </li>
              <li className="text-orange-500">Level 2: </li>
              <li className="text-red-500">Level 3: </li>
            </ul>
            <ul className="text-white">
              <li>Low risk of repeat offense </li>
              <li>Moderate risk of repeat offense</li>
              <li>High risk of repeat offense and a threat to public safety</li>
            </ul>
          </div>
        </section>
        <form
          className="flex flex-col w-1/2 text-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="offender-input"
            {...register("zipcode", { minLength: 5, maxLength: 5 })}
            placeholder="Zip Code (5 digits)"
          />
          <input
            className="offender-input"
            {...register("city")}
            placeholder="City"
          />
          <input
            className="offender-input"
            {...register("state")}
            placeholder="State"
          />
          <input
            className="submit-input mt-[5px]"
            type="submit"
            value="Search"
          />
        </form>
      </div>

      <div className="sub-container mx-auto mt-5">
        <div className="flex justify-between pl-1 pr-3">
          <Pagination
            total={totalPages}
            color="primary"
            page={currentPage}
            onChange={setCurrentPage}
          />
          {currentSearch.length > 0 ? (
            <span>SEARCHING BY: {currentSearch.join(" ")}</span>
          ) : null}
          <p className="text-small text-default-500 text-center">
            {totalPages ? `${currentPage} / ${totalPages}` : null}
          </p>
        </div>
        {}
        {newRender ? (
          <div className="flex flex-col text-center items-center">
            <h3 className="">
              Please enter a Zip Code, City, and/or State to start your search
            </h3>

            <h4 className="my-4">
              For the most accurate results, please use{" "}
              <strong>zip code</strong>
            </h4>
            <Image
              src="svgs/search.svg"
              alt="search-svg"
              width={100}
              height={100}
            />
          </div>
        ) : !loading && offenders.length == 0 ? (
          <div className="flex flex-col items-center text-center">
            <h3 className="my-4">
              No registered offenders found in this area{" "}
            </h3>
            <Image src="svgs/yay.svg" alt="yay-svg" width={80} height={100} />
            <h4>Feel free to search again</h4>
          </div>
        ) : null}

        {loading ? (
          <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
          />
        ) : null}
        <Accordion selectionMode="multiple">
          {currentItems.map((o: OffenderData) => {
            let crimeDesc = o.crime.split("*");
            let image = o.offenderImageUrl;
            return (
              <AccordionItem
                className="text-md"
                key={o.uuid}
                title={o.name}
                subtitle={`Risk Level: ${o.riskLevel}`}
              >
                <section className="flex justify-between">
                  <a
                    className="hover:bg-gray-400 underline text-blue-500 text-wrap"
                    href={o.offenderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Official Record
                  </a>

                  <p className="text-gray-500 text-sm">
                    Last Updated: {o.updatedAt.slice(0, 10)}
                  </p>
                </section>

                <div className="flex text-sm justify-between">
                  <div className="w-1/3">
                    <section id="offender-info" className="">
                      <p>
                        {o.age ? `${o.age} y/o ` : null}
                        {o.race} {o.sex}
                        {o.ethnicity === "Hispanic" ? `, Hispanic` : null}
                      </p>
                      <p>Address: {o.address}</p>
                      <p>
                        {o.city}, {o.state}
                      </p>
                      <p>Eye color: {o.eyeColor}</p>
                      <p>Height (ft): {o.height}</p>
                      <p>Weight (lbs): {o.weight}</p>
                      {o.marks ? <p>Marks: {o.marks} </p> : null}
                    </section>
                    {/* <Image
                      src={image}
                      alt={o.name + 'img'}
                      width={50}
                      height={50}

                    /> */}
                  </div>

                  <section id="crime-info" className="w-3/5">
                    {o.crime ? (
                      <ul>
                        {crimeDesc.map((crime, i) => {
                          return <li key={i}>{crime}</li>;
                        })}
                        {/* <li id="crime-date">{crimeDesc[8]}</li>
                        <li
                          id="conviction-date"
                          className="border-b border-gray-400"
                        >
                          {crimeDesc[9]}
                        </li>
                        <li id="description">{crimeDesc[7]}</li>
                        <li id="victim" className="border-b border-gray-400">
                          {crimeDesc[10]}
                        </li>
                        <li id="sentence">{crimeDesc[18]}</li> */}
                      </ul>
                    ) : null}
                  </section>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </main>
  );
};

export default RegisteredOffenders;
