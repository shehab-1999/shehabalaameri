'use client'

import { useGetAllPatientsWithOppon } from "@/queries/oppo/useGetPatientWithOppo";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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

export default function BigChartBox(){
  const { data } = useGetAllPatientsWithOppon();

  const totalOppoinInWeek = new Array(7).fill(0).map((_, index) => {
   const today=new Date();
   const startOfWeek=new Date(today);
   startOfWeek.setDate(today.getDate()-today.getDay());
   const totalOpp=data?.filter((patient)=>{
    const patientDate=new Date(patient?.createdAt);
    return(
      patientDate.getFullYear()==today.getFullYear()&&
      patientDate.getMonth()==today.getMonth()&&
      patientDate.getDate()>=startOfWeek.getDate()&&
      patientDate.getDay()==index
    );
   });
   return {"uv":totalOpp?.length||0}
});


const daysOfWeek = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-between">
      <h1 className="text-[20px] font-serif">عدد الحجوزات في كل يوم </h1>
      <div className="h-[300px] w-[100%]" >
        <ResponsiveContainer width="99%" height="100%" >
          <BarChart
            width={500}
            height={300}
            data={totalOppoinInWeek}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              tickFormatter={(index) =>(daysOfWeek[index])}
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
            >
              {totalOppoinInWeek.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

