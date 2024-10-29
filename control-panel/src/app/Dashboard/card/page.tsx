"use client";

import Button from "@/app/components/ui/button";
import DangerDialog from "@/app/components/ui/danger-dialog";
import { Port_Lligat_Sans } from "next/font/google";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { Row } from "antd";

type Props = {
  NameOfField?: any;
  height?: any;
  width?: any;
  header?: string;
  type?:"Table"|"div",
  children?: React.ReactNode; // إضافة children كنوع
};

export default function Card({ NameOfField, height, width, header, children ,type}: Props) {


  const screen =( window.innerWidth / 2) / (NameOfField?.length+1 || 1); // تأكد من عدم القسمة على صفر

  return (
    
      <div
        style={{ height: `${height}`, width: `${width}`,scrollbarWidth:"none" }}
        
        className={`bg-white  justify-center overflow-y-scroll overflow-x-auto shadow-2xl shadow-white rounded-[2%]  border-solid border-[1px]`}
      >
        <h1 className={`text-center font-serif font-bold`}>{header}</h1>

      {type=="Table" ?  <div className="font-serif bg-white">
          <div className="table border-collapse  bg-gray-50">
            <div className="table-header-group text-white"  style={{ position: "sticky", zIndex: 1, top: 0 }}>
              <div className="table-row bg-[#91a1b6]">
                {NameOfField?.map((field: any, fieldIdx: number) => (
                  <div
                    style={{ width: `${screen}px` }}
                    key={fieldIdx}
                    className="table-cell text-center border-solid border-y-[1px] p-[10px] mb-[3px]"
                  >
                     <div
                             className=" whitespace-nowrap"
                          >
                    {field}
                    </div>
                  </div>
                ))}
                 <div
                    style={{ width: `${screen}px` }}
                  
                    className="table-cell text-center border-solid border-y-[1px]  p-[20px] "
                  >
                   {"الإجراءت"} 
                  </div>
              </div>
            </div>

           {children}
          </div>
        </div>:children}
      </div>
    
  );
}