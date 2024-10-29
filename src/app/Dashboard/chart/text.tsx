import { apifetch } from "@/api";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface PropsChartDoctor {
  data: any;
}

const DoctorChart = (props: PropsChartDoctor) => {
  const data = props.data?.filter((item: any) => item.value !== 0);
  const sortedData = data?.sort((a: { value: number }, b: { value: number }) => b.value - a.value);
  const maxValue = Math.max(...sortedData?.map((item: { value: number }) => item.value));
  const ticks = sortedData?.map((item: { value: any }) => item.value);

  const getTickColor = (index: number) => {
    const colors = ["red", "blue", "green", "orange", "purple", "brown", "pink", "gray", "olive", "cyan"];
    return colors[index % colors.length];
  };

  const wrapText = (text: string, maxLength: number) => {
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + word + " ";
      const testWidth = testLine.length * 7; // تقدير الطول (يمكن تعديل الرقم حسب الخط المستخدم)

      if (testWidth > maxLength) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());
    return lines;
  };

  return (
    <div className="h-[300px] w-[100%] flex flex-col justify-between">
      <h1 className="text-center text-green-800 text-[20px] font-bold">
        حصائيات عدد المرضى الأكثر عشرة دكاترة
      </h1>

      <div className=" w-[100%] h-[295px]">
        <ResponsiveContainer>
          <BarChart
            data={sortedData}
            margin={{ top: 10, bottom: 40, right: 40, left: -10 }}
            layout="horizontal"
          >
            <XAxis
              type="category"
              dataKey="name"
              stroke="#ffff"
              className="pt-3"
              interval={0}
              tick={({ x, y, payload }: { x: any, y: any, payload: any }) => {
                const wrappedText = wrapText(payload.value, 80); // 80 بكسل
                return (
                  <g rotate={-45} transform={`translate(${x}, ${y})`} >
                    {wrappedText.map((line, index) => (
                      <text
                        key={index}
                        
                        fill={getTickColor(payload.index)}
                        y={index * 15} // المسافة بين الأسطر
                        textAnchor="start"
                        
                        
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              }}
            />

            <YAxis
              stroke="#ffff"
              type="number"
              className="hidden"
              tick={{ fill: "black" }}
              domain={[0, maxValue]}
              ticks={ticks}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <Tooltip />
            <defs>
              <linearGradient id="colorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00BFFF" stopOpacity={1} />
                <stop offset="100%" stopColor="#00CED1" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Bar dataKey="value" barSize={30} fill="url(#colorGradient)">
              <LabelList dataKey="value" position="insideTop" offset={-2} fill="black" style={{ textAnchor: "start" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoctorChart;