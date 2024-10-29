"use client";

import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useGetAllPatientsWithOppon } from "@/queries/oppo/useGetPatientWithOppo";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { date } from "zod";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const getPath = (x: any, y: any, width: any, height: any) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function BigChartBox() {
  const { data } = useGetAllPatientsWithOppon();
  const { data: departments } = useGetDepartments();
  const { data: patientsData } = useGetAllPatientsWithOppon();
  
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // تحديد العرض الصغير
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const totalAppointmentsInWeek = new Array(7).fill(0).map((_, index) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7)); // لتصبح السبت بداية الأسبوع
    
    const totalAppointments = patientsData?.filter((patient:any) => {
      const patientDate = new Date(patient?.date);
     
      return (
        patientDate.getFullYear() === today.getFullYear() &&
        patientDate.getMonth() === today.getMonth() &&
       patientDate.getDate()>=startOfWeek.getDate()&&
        patientDate.getDay() === (index +6) % 7 &&
        (selectedDepartment === "" ||
          patient.doctor.department.depName === selectedDepartment)
      );
    });

    return { uv: totalAppointments?.length || 0 };
  });

  const daysOfWeek = [
    "السبت",
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ];

  const handleDepartmentChange = (event: any) => {
    setSelectedDepartment(event.target.value);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const filterday = isSmallScreen
    ? daysOfWeek.filter((day, index) => {
        if (totalAppointmentsInWeek[index].uv > 0) {
          return day;
        }
      })
    : daysOfWeek;
  const filteredData = isSmallScreen
    ? totalAppointmentsInWeek.filter((day, index) => {
        return day.uv > 0;
      })
    : totalAppointmentsInWeek;

  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-between">
      {/* <h1 className="text-[20px] font-serif">عدد الحجوزات في كل يوم </h1> */}
      <h1 className="text-center mt-2">
        {" "}
        <select
          className="font-bold text-[20px] text-center text-green-600 "
          onChange={handleDepartmentChange}
          value={selectedDepartment}
        >
          <option value=""> عدد حجوزات جميع الأقسام</option>
          {departments?.map((depart:any) => (
            <option key={depart.depName} value={depart.depName.trim()}>
              عدد حجوزات قسم {depart.depName}
            </option>
          ))}
        </select>
      </h1>
      <div className="h-[300px] w-[100%]">
     
          <ResponsiveContainer width="99%" height="100%">
            <BarChart width={500} height={300} data={filteredData}>
              <XAxis
                // Use the index of the data as the x-coordinate
                tickFormatter={(index: any) => filterday[index]}
                className=""
                reversed
                tickLine={false}
                tick={true}
              />
              <YAxis tickLine={false} />

              <CartesianGrid strokeDasharray="3 3" />

              <Bar
                dataKey="uv"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              ></Bar>
            </BarChart>
          </ResponsiveContainer>
      
      </div>
    </div>
  );
}
