// "use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import session from "../app/layout";
// import TrafficForm from "./components/TrafficForm";
// import RegisteredOffenders from "./components/RegisteredOffenders";
import getOffenders from "./fetches/getOffenders";
export default async function Home() {
  // const [trafficData, setTrafficData] = useState<any[]>([]);
  // const [offenderData, setOffenderData] = useState<any>(null);

  // useEffect(() => {
  // }, []);
  return (
    <main>
      {/* <RegisteredOffenders data={offenderData} /> */}
      {/* <TrafficForm /> */}
    </main>
  );
}
