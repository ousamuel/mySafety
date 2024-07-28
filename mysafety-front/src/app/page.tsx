"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import session from "../app/layout";
// import TrafficForm from "./components/TrafficForm";
// import RegisteredOffenders from "./components/RegisteredOffenders";
import getOffenders from "./fetches/getOffenders";
import { Divider } from "@nextui-org/react";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession();

  const handleGetStarted = () => {
    if (!session) {
      signIn("google", { callbackUrl: "https://my-safety-lyart.vercel.app/registered-offenders" });
    } else {
      window.location.href = "https://my-safety-lyart.vercel.app/registered-offenders";
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-200 to-gray-200 text-gray-800 min-h-screen">
      {/* Navigation Bar */}

        {/* Hero Section */}
        <header className="bg-gray-200 py-20 px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to MySafety
            </h1>
            <p className="mt-4 text-gray-600">
              Your resource for safety information and offender registration details.
            </p>
            <button
              onClick={handleGetStarted}
              className="mt-8 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Get Started
            </button>
          </div>
        </header>

      {/* Main Content */}
      <main className="container mx-auto py-4 px-14">
        <section id="registered-offenders" className="py-14">
          <h2 className="text-2xl font-bold text-gray-800">
            Registered Offenders
          </h2>
          <p className="mt-2 text-gray-600">
            View detailed information about registered offenders in your area.
          </p>
          <a
            href="/registered-offenders"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Search
          </a>
        </section>
        <Divider className="my-2" />

        <section id="crime-data" className="py-14 text-right">
          <h2 className="text-2xl font-bold text-gray-800">Traffic Data</h2>
          <p className="mt-2 text-gray-600">
            Find real-time data on traffic incidents around you.
          </p>
          <span
            // href="/registered-offenders"
            className="mt-4 inline-block bg-gray-500 text-white py-2 px-4 rounded"
          >
            Coming Soon
          </span>
        </section>
      </main>

      <footer className="py-4">
        <div className="container mx-auto text-center text-gray-600">
          &copy; 2024 MySafety. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
