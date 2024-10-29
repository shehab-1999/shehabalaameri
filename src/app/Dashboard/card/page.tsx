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
  type?: "Table" | "div";
  children?: React.ReactNode; // إضافة children كنوع
};

export default function Card({
  
  children,
  type,
}: Props) {
 
  return (
    <div className="w-[100%] font-serif shadow-2xl shadow-white border-solid border-[3px]  "  >
      <div className="font-serif">
    

      {type == "Table" ? (
        

            children
        
      
      ) : (
        children
      )}
    </div> </div>
  );
}
