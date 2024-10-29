'use client'
import React from "react";

export default function Footer() {
  return (
    <div
      className="flex justify-between items-center p-5 mt-[20px] bg-white shadow-md"
      style={{ position: "sticky", bottom: 0, zIndex: 1 }}
    >
      <span className=" hover:bg-red-500 font-bold text-sm">my dashboard</span>
      <span className=" hover:bg-red-500 font-bold text-sm">
        &copy;dashboard for Me
      </span>
    </div>
  );
}
