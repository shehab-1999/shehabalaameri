"use client"
import { apifetch } from "@/api";
import { useEffect, useState } from "react";
import PatientStatistics from "../chart/chartpatients";
import Chartdepartment from "../chart/chartdepartment";
import DoctorChart from "../chart/chartDoctor";
import Chart from "../chart/chart";

export default function Statistic() {
  const [data, setData] = useState<any>(null); // استخدم نوع any مؤقتًا
 useEffect(()=>{


 const fetchData = async () => {
    const result = await apifetch.get("Statistics", { headers: { Authorization: 'Bearer' } });
    setData(result.data);
  };

  fetchData();

 },[])
 

  if (!data) {
    return <div>جاري جلب البيانات</div>; // أضف شاشة تحميل أثناء انتظار البيانات
  }

  return (
    data && (
      <div className="grid gap-[1px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 font-serif content-center bg-white">
        <div className="rounded-[10px] border-solid border-[3px] bg-white h-[360px] col-span-1  max-xl:col-span-2 ">
          <PatientStatistics/>
        </div>
        <div className="rounded-[10px] border-solid border-[3px] bg-white h-[360px] col-span-1  max-xl:col-span-2 ">
          <DoctorChart data={data.chartPatients} />
        </div>
        <div className="rounded-[10px] border-solid border-[3px] bg-white h-[300px] col-span-1  max-xl:col-span-2 ">
        <Chart data={data.chartPatientInDepartment} />
        </div>
        <div className=" rounded-[10px] border-solid border-[3px] bg-white h-[300px] col-span-1  max-xl:col-span-2 ">
          
        <Chartdepartment data={data.chartDepartments} />
        </div>
      </div>
    )
  );
}