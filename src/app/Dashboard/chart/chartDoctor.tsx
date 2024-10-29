import { apifetch } from "@/api";
import TextArea from "antd/es/input/TextArea";
import React from "react";
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
  const sortedData = data?.sort(
    (a: { value: number }, b: { value: number }) => b.value - a.value
  );
  const maxValue = Math.max(
    ...sortedData?.map((item: { value: number }) => item.value)
  );
  const ticks = sortedData?.map((item: { value: any }) => item.value);
  const renderCustomizedLabel = (props:any) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
  
    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#00BFFF"/>
        <text x={x + width / 2} y={y - radius} fill="white" textAnchor="middle" dominantBaseline="middle">
          {value}
        </text>
      </g>
    );
  };
  const getTickColor = (index: number) => {
    const colors = [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "brown",
      "Violet",
      "gray",
      "olive",
      "dark-cyan",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="h-[300px] w-[100%] flex flex-col justify-between">
      <h1 className="text-center text-green-800 text-[20px] font-bold ">
        حصائيات عدد المرضى الأكثر عشرة دكاترة
      </h1>

      <div className="w-[100%] h-[340px]">
        <ResponsiveContainer>
          <BarChart
            data={sortedData}
            className="max-xl:left-[5%]"
            margin={{ top: 15, bottom: 40, right: 90, left: 50 }}
            layout="horizontal"
          >
            <XAxis
              type="category"
              dataKey="name"
              stroke="#ffff"
              interval={0}
              labelLine={false}
              l
              tick={({ x, y, payload }: { x: any; y: any; payload: any }) => (
                <text
                  x={x}
                  y={y} // رفع النص 10 بكسل فوق المخطط
                  fill={getTickColor(payload.index)}
                  transform={`rotate(-26, ${x}, ${y})`}
                  textAnchor="midAngle"
                >
                  {payload.value}
                </text>
              )}
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
              <linearGradient
                id="colorGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00BFFF" stopOpacity={1} />
                <stop offset="100%" stopColor="#00CED1" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Bar dataKey="value" barSize={30} fill="url(#colorGradient)">

              
              <LabelList
                dataKey="value"
                position="top"
                content={renderCustomizedLabel}
                offset={-2}
                fill="dark-red"
                style={{ textAnchor: "middle" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoctorChart;
