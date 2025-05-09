"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import GlobalDataLoader from "@/components/GlobalDataLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <GlobalDataLoader />
          <div className="h-screen flex flex-col">
            <Navbar />
            <Toaster position="top-right" />
            <main className="flex-1">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}