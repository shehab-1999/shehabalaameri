import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { apifetch } from "@/api"; // تأكد من تعديل المسار حسب هيكلك
interface Props{
  data?:any
}
const monthNames = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const PatientStatistics = (datas:Props) => {
  const [data, setData] = useState<{ month: number; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apifetch.get("Statistics",{headers:{Authorization:'Bearer 1'}});
      setData(result.data);
    };

    fetchData();
  }, []);

  // تحويل البيانات إلى الشكل المطلوب للمخطط
  const chartData = data
    .map((item) => ({
      name: monthNames[item.month - 1], // استخدام أسماء الأشهر
      uv: item.count, // عدد المرضى
    }))
    .reverse(); // عكس ترتيب البيانات
    const totalCount = data.reduce((total, item) => total + item.count, 0);
  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-between ">
      <h1 className="text-center text-green-800 text-[20px] font-bold py-2">إحصائيات عدد المرضى  لهذا العام</h1>
      <h1 className="font-bold text-red-600 py-1 px-2">العدد الكلي للأمراض: {totalCount}</h1>
      <div className="h-[300px] w-[100%]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            height={300}
            margin={{
              right: 30,
              left: -20,
              bottom: 20,
            }}
            data={chartData}
          >
             <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <XAxis
              dataKey="name"
              interval={0} // يمكنك استخدام هذه الخاصية لضبط عرض التكسات
              tick={{
                angle: -45, // لتدوير التكسات إذا كانت طويلة
                textAnchor: "scroll", // لضبط موضع التكسات
              }}
            />
            <YAxis
              tickFormatter={(value) => Math.floor(value).toString()}
              tickLine={false}
            />
            <Tooltip />

            <Line
              type="bumpX"
              dataKey="uv"
              stroke="#8884d8"
              fill="#0088FE"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
       
       
      
      </div>
    </div>
  );
};

export default PatientStatistics;
