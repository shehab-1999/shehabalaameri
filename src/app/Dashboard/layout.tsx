"use client";
import Home from "./Home/page";
import Menu from "../components/Menu/page";
import NavBar from "../components/navbar/page";

import { apifetch } from "@/api";

import React, { createContext, useEffect } from "react";

import { signOut, useSession } from "next-auth/react";

// Define the shape of your context value

// إنشاء السياق مع قيمة افتراضية

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = useSession();

  const Authorization = async () => {
    if (session?.user) {
      const response = await apifetch.get(`/auth/login`, {
        headers: { Authorization: `Bearer ${session?.user?.email}` },
      });

      if (
        JSON.stringify(response.data[0].permissions) !==
        JSON.stringify((session.user as { permissions: string }).permissions)
      ) {
        await signOut({ callbackUrl: "/login" });
      }
    }
  };

  Authorization();
let height=700
if (typeof window !== "undefined") {
  height = (window.screen.height / 5)+10;
 
}
  return (
    <div>
      {session?.user && (
        <>
          <div style={{height:`${4*height}px`}} className={`flex bg-slate-200 w-[100%] h-[${height}px] font-serif`}>
            <div
              className="font-sans shadow-lg  text-black p-1 flex-flex4 flex max-sm:w-[80%] flex-col h-[100%] "
              dir="rtl"
            >
              <NavBar />

              <div className="px-5  mt-[10px] bg-slate-200 w-[100%]">
                {children}
              </div>
            </div>
            <div className="rounded-tr-[10px] rounded-tl-[10px] rounded-br-[10px] border-solid border-white  border-[10px] bg-white w-[20%] ">
              <Menu />
            </div>{" "}
          </div>
        </>
      )}
    </div>
  );
}
