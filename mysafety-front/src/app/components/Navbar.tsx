"use client";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";
import React from "react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <section className="align-middle">
          <a
            href="/"
            className="my-auto h-fit text-2xl font-bold flex relative"
          >
            <span className="z-50 ">MySafety</span>
            <Image
              src="/svgs/shield.svg"
              className="ml-1"
              width={30}
              height={30}
              alt="mysafety-logo"
            />
          </a>
        </section>

        <div className="flex items-center">
          <a
            href="/registered-offenders"
            className="text-gray-800 hover:text-blue-500 ml-4"
          >
            Registered Offenders
          </a>
          {session?.user ? (
            <div className="flex items-center ml-4">
              <span className="mr-2 text-gray-800">Welcome, {session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-blue-500 text-white px-3 py-1 rounded ml-4"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
