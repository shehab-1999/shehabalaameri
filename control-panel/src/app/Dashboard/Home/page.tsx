"use client";
import React, { useEffect, useState } from "react";
import Doctor from "../doctor/page";
import BigChartBox from "../chart/page";
import DepartmentHome from "./depratmentHome/page";
import AppointmentToday from "../patients/page";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { PermissionContext } from "../../permision/hashpermision";

export default function Home() {
  const permision=useContext(PermissionContext)
  
  return (
    <div className="grid gap-[10px] grid-cols-4 font-serif font-bold max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 h-[calc(100%-40px)] ">
      <div className=" rounded-[10px] border-[1px] border-solid col-span-3 border-gray-200 shadow-white   pr-[40px] bg-white">
        <BigChartBox />
      </div>
      <div style={{scrollbarWidth:"none"}} className=" rounded-[10px] border-[1px] border-solid border-gray-200 shadow-lg shadow-white  overflow-y-scroll h-[350px] bg-white max-md:w-[100%]">
     <Doctor />
      </div>
     <div  className="rounded-[10px]  border-[1px] border-solid col-span-3 h-[290px] border-gray-200 shadow-white scroll-auto mb-[20px]   overflow-y-auto  shadow-lg mt-0 bg-white " style={{scrollbarWidth:"none"}}>
      <div style={{zIndex:1, top:0, position:'sticky'}} className="rounded-[10px] border-solid bg-[#091E3A] w-[100%]"><h1 className="text-3xl font-normal text-center text-white font-serif">حجوزات اليوم</h1></div>
   <AppointmentToday/>
        
      </div>
      <div style={{scrollbarWidth:"none"}} className=" rounded-[10px] border-[1px] border-solid border-gray-200 shadow-lg shadow-white  overflow-y-scroll h-[290px] bg-white">
      <DepartmentHome/>
      </div>
    </div>
  );
};

