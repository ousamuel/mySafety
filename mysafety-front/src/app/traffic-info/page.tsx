"use client";
import React, { useEffect, useState, Suspense } from "react";
import Script from "next/script";
import getTraffic from "../fetches/getTraffic";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Pagination, Button } from "@nextui-org/react";
import Image from "next/image";
import getAddressFromCoords from "../fetches/getGeocoded";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleMapsComponent from "../components/GoogleMaps";
import Google from "next-auth/providers/google";
interface trafficData {}

interface SearchFormValues {
  zipcode: string;
  city: string;
  state: string;
}

const TrafficInfo: React.FC = () => {
  // console.log(
  //   getAddressFromCoords({
  //     // address: "195-19 Northern Blvd, Queens, NY 11358",
  //     // address: "2601 West 7th St Fort Worth, Texas 76107",
  //     address: "59-23 162nd St, Flushing, NY 11365",
  //   })
  // );
  const [coords, setCoords] = useState<[]>([]);
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [newRender, setNewRender] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<trafficData[]>([]);
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
      <h1 className="px-4 font-bold text-center">
        Traffic Incidents Around You
      </h1>
      <h4 className="px-2 text-gray-500 text-center text-sm">
        ???????????????
      </h4>
      <Button
        onClick={() => {
          setOpenMap((prev) => !prev);
        }}
      >
        Toggle Maps
      </Button>
      <div className="middle-colored-bar p-2 mt-4 flex flex-wrap justify-evenly items-center">
        <GoogleMapsComponent setCoords={setCoords}/>
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
};

export default TrafficInfo;
