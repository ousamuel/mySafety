import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import SessionProvider from "../SessionProvider";
import Navbar from "./components/Navbar";
import { GoogleTagManager } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MySafety",
  description: "Stay Informed!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_MEASUREMENT_ID} />

      </head>
        <SessionProvider session={session}>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
    </SessionProvider>
      </html>
  );
}
