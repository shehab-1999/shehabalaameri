"use client";
import React, { useContext } from "react";
import Doctor from "../doctor/doctorHome";
import BigChartBox from "../chart/page";
import DepartmentHome from "../department/departmentHome";
import AppointmentToday from "../patients/patientHome";

import Header from "@/app/components/ui/header";

export default function Home() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 pt-1  font-serif">
      <div className=" rounded-[10px] border-solid  border-gray-200 shadow-lg bg-white h-80 col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-4">
        <BigChartBox />
      </div>

      <div  style={{ scrollbarWidth: "none" }} className=" rounded-[10px] border-solid  overflow-scroll border-gray-200 shadow-lg bg-white h-80   col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
        <Doctor />
      </div>

      <div  style={{ scrollbarWidth: "none" }} className=" rounded-[10px] border-solid  overflow-scroll border-gray-200 shadow-lg bg-white h-72 overflow-y-auto mb-4  col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-4">
        <Header> حجوزات اليوم</Header>
        <AppointmentToday />
      </div>

      <div
        style={{ scrollbarWidth: "none" }}
        className=" rounded-[10px] border-solid  overflow-scroll border-gray-200 shadow-lg bg-white h-72  col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2"
      >
        <DepartmentHome />
      </div>
    </div>
  );
}
