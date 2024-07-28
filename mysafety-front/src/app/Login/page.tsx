"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import React from "react";
export default function login() {
  const session = useSession();
  return (
    <div>
      <div></div>
      <div>
        {" "}
        {session?.data?.user?.name ? (
          <div>
            <div>Welcome {session.data.user.name}</div>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        ) : (
          <div>
            <div>Please Login</div>
            <button onClick={() => signIn("google")}>LOGIN</button>
          </div>
        )}
      </div>
    </div>
  );
}
