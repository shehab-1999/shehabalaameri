'use client'
import React from "react";
import Link from "next/link";
import { menu } from "./data";
export default function Menu() {
  return (
    <div className="text-black   font-serif font-bold text-[20px]   bg-white w-[100%] ">
      <div className="flex justify-center"><img src="/12.jpg" width={50} height={50} className="object-cover rounded-[50%] "></img></div>
      <div className="rounded-xl ml-[10px] mr-[10px] pl-[50px] pr-[50px] pt-[5px] pb-[5px] border-solid mt-[8%] bg-[#091E3A]"><h1 className="text-white rounded-sm">Dashboard</h1></div>
      {menu.map((item) => (
        <div className="w-[100%] hover:bg-gray-200 hover:shadow-2xl hover:shadow-current " key={item.id}>
          <Link key={item.id} href={item.url} className="flex items-center">
           
            <div className=" text-center p-2 w-[100%]   ">
              {item.title}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
