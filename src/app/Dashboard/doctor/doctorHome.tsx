import React from "react";
import Header from "@/app/components/ui/header";
import { useGetDoctor } from "@/queries/doctors/getAllDoctors";

export default function Doctor() {
  const { isLoading, error, data } = useGetDoctor();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-black w-[100%]">
      <Header>الدكاترة</Header>

      {data?.map((doctor:any, index:any) => (
        <div
          key={index}
          className="hover:shadow-2xl hover:shadow-current pr-[10px] pl-[10px] o flex flex-row rounded-sm items-center justify-between mb-[20px] w-[100%] hover:bg-gray-200"
        >
          <div>
            {doctor.img !== null ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/images/${doctor.img}`}
                alt={`'s avatar`}
                width={50}
                height={50}
                className="rounded-full bg-black"
              />
            ) : (
              "لا توجد صورة"
            )}
          </div>

          <div>
            <h2>{doctor.doctorName}</h2>
            <h2 className="opacity-70 text-center">{doctor.department.depName}</h2>
          </div>
          <div className="opacity-70 text-center">
            <h1>الامراض</h1>
            <div className="opacity-70 text-center font-sans">{doctor.patient.length}</div>
          </div>
        </div>
      ))}
    </div>
  );
}