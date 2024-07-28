// "use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import getOffenders from "./fetches/getOffenders";
import { Divider } from "@nextui-org/react";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Head from "next/head";

export default async function Home() {
  return (
    <main>
      {/* <RegisteredOffenders data={offenderData} /> */}
      {/* <TrafficForm /> */}
    </main>
  );
}
