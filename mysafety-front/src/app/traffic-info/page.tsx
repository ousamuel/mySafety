"use client";
import React, { useEffect, useState } from "react";
import getTraffic from "../fetches/getTraffic";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Pagination, Progress } from "@nextui-org/react";
import Image from "next/image";
import AnalyticsComponent from "../components/FirebaseAnalytics";
import { useForm, SubmitHandler } from "react-hook-form";

interface OffenderData {
}

interface VagueSearchFormValues {
  zipcode: string;
  city: string;
  state: string;
}

const TrafficInfo: React.FC = () =>{

  const [newRender, setNewRender] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<OffenderData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentSearch, setCurrentSearch] = useState<string[]>([]);
  const itemsPerPage = 5;
//   const fetchOffenders = async (input: VagueSearchFormValues) => {
//     try {
//       const res = await getOffenders(input);
//       // console.log(res?.data.offenders);
//       setOffenders(res?.data.offenders || []);
//       setLoading(false);
//     } catch (error) {
//       // console.error("Error fetching offenders:", error);
//       setLoading(false);
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<VagueSearchFormValues>();
//   const validateForm = (data: VagueSearchFormValues) => {
//     if (data.zipcode || data.city || data.state) {
//       return true;
//     }
//     return false;
//   };
//   const onSubmit: SubmitHandler<VagueSearchFormValues> = async (data) => {
//     if (!validateForm(data)) {
//       return;
//     }
//     setNewRender(false);
//     setOffenders([]);
//     setLoading(true);
//     setCurrentSearch([data.zipcode, data.city, data.state]);
//     await fetchOffenders(data);
//     setCurrentPage(1);
//     reset();
//   };
//   useEffect(() => {
//     setNewRender(true);
//   }, []);

//   useEffect(() => {
//     setTotalPages(Math.ceil(offenders.length / itemsPerPage));
//   }, [offenders]);

//   const currentItems = offenders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );
  return (
    <main>
      <AnalyticsComponent />
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
        {/* <form
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
        </form> */}
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

      </div>
    </main>
  );
}

export default TrafficInfo;
