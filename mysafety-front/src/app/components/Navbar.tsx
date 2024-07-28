"use client";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";
import React from "react";
const Navbar: React.FC = () => {
  const session = useSession();
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
              width={31}
              height={31}
              alt="mysafety-logo"
            />
          </a>
        </section>
        <div>
          {" "}
          {session?.data?.user?.name ? (
            <div className="text-gray-800 font-bold ml-4">
              <div className="hover:">Welcome {session.data.user.name}</div>
              <button onClick={() => signOut()}>Sign Out</button>
            </div>
          ) : (
            <div>
              <button onClick={() => signIn("google")}>LOGIN</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
