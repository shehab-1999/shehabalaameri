import { apifetch } from "@/api";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
interface PropsCharDepartment{
  data?:any[]
}
const Chartdepartment = (props:PropsCharDepartment) => {
  const data=props.data?.filter((item: any) => item.value !== 0);
 

  const colors = [
    "#C19A6B", // بني فاتح
    "#F2B5D4", // فاتح
    "#D5DBDB", // فاتح
    "#F7C6C7", // فاتح
    "#AAB7B8", // فاتح
    "#85C1AE", // فاتح
    "#A0522D", // بني متوسط
    "#F39C12", // فاتح
    "#A65E2E", // بني محروق
    "#45B39D", // فاتح
    "#A50034", // عنابي متوسط
    "#3498DB", // فاتح
    "#C0392B", // عنابي داكن
    "#16A085", // فاتح
    "#9B1B30", // عنابي داكن
    "#7D7D7D", // فاتح
    "#8E1A1A", // عنابي غامق
    "#148F77", // فاتح
    "#6D2C2B", // عنابي غامق جداً
    "#9B59B6", // فاتح
    "#5E3A3A", // عنابي غامق جداً
    "#2980B9", // فاتح
    "#4C2C2C", // عنابي غامق جداً
    "#B2EBF2", // فاتح
    "#7B3F00", // بني محروق
    "#1ABC9C", // فاتح
    "#B03A2E", // عنابي فاتح
    "#E67E22", // فاتح
    "#3C2A2A", // عنابي غامق جداً
    "#BBDEFB", // فاتح
    "#810A14", // عنابي غامق جداً
  ];
colors.reverse()
  // إزالة الألوان المتكررة


  //@ts-ignore
  const customLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;

    // حساب موضع النص لجعله في نفس الخط مع labelLine
    const lineX = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
    const lineY = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);
    
    return (
      <text
        x={lineX}
        y={lineY}
        fill="#000"
        textAnchor="middle" // جعل النص في بداية الخط
        dominantBaseline="center"
      >
        {`${value}`}
      </text>
    );
  }

  
  const totalCount = data?.reduce((total, item) => total + item.value , 0);
  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-between">
      <h1 className="text-center text-green-800 text-[20px] font-bold py-2">
        إحصائيات عدد الدكاترة لكل قسم
      </h1>
      
      <h1 className="font-bold text-red-600 py-1 px-2">العدد الكلي للدكاترة: {totalCount}</h1>
      <div className="h-[300px] w-[100%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={300} height={300}>
            <Pie
              className="max-sm:hidden"
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70} // نصف قطر الخارجي
              innerRadius={40}
              
              label={customLabel}
              labelLine={false} // تأكد من أن هذه الخاصية مفعلة
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Legend
            
              //@ts-ignore
              formatter={(value, entry) => <text fill="#000" className="font-bold pr-1 font-serif">
                {value}:{entry.payload?.value}
              </text>}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chartdepartment;




