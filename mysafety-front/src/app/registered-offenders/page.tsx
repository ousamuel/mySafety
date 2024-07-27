"use client";
import React, { useEffect, useState } from "react";
import getOffenders from "../fetches/getOffenders";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Pagination, Button } from "@nextui-org/react";
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
  // sources: Source[];
  state: string;
  updatedAt: string;
  uuid: string;
  weight: string;
  zipcode: string;
}
const RegisteredOffenders: React.FC = () => {
  const tempOffenderSearch = {
    zipcode: 11365,
  };
  const [offenders, setOffenders] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  useEffect(() => {
    const fetchOffenders = async () => {
      try {
        const res = await getOffenders(tempOffenderSearch);
        console.log(res?.data.offenders);
        setOffenders(res?.data.offenders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching offenders:", error);
      }
    };

    fetchOffenders();
  }, []);
  const totalPages = Math.ceil(offenders.length / itemsPerPage);

  const currentItems = offenders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>loading</div>;
  }
  // test
  return (
    <main>
      <h1>Header</h1>
      <div>form data headers</div>
      <div className="sub-container mx-auto">
        <div className="flex justify-between ">
          <Pagination
            total={totalPages}
            color="secondary"
            page={currentPage}
            onChange={setCurrentPage}
          />
          <p className="text-small text-default-500 text-center">
            Selected Page: {currentPage}
          </p>
        </div>
        <Accordion>
          {currentItems.map((o: OffenderData) => (
            <AccordionItem key={o.uuid} title={o.lastName}>
              <h1>{o.name}</h1>
              <div>{o.crime}</div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
};

export default RegisteredOffenders;
