"use client";
import React, { useState } from "react";
import Link from "next/link";
import { menu } from "./data";
import { useSession } from "next-auth/react";

export default function Menu() {
  const { data: session } = useSession();

  const [activeIndex, setActiveIndex] = useState<number>(); // حالة جديدة لتتبع العنصر النشط

  const permission = (session?.user as { permissions: any }).permissions;

  const handleLinkClick = (index: number) => {
    setActiveIndex(index); // تحديث الحالة عند النقر على رابط
  };
  const handleLinkClic = (index: any[], t: any) => {
    const s = () => {
      let result = ""; // متغير لتخزين النتيجة
      for (let i = 0; i < index.length; i++) {
        result += `${t}${index[i]}`; // اجمع القيم
      }
      return result; // أعد النتيجة النهائية
    };

    return s(); // استدعاء الدالة وإرجاع النتيجة
  };
  return (
    <div className="text-black font-serif font-bold text-[20px] bg-white w-[100%]">
      <div className="flex justify-center"></div>
      <div className="rounded-xl ml-[10px] mr-[10px] pl-[50px] pr-[50px] pt-[5px] pb-[5px] border-solid max-md:hidden max-lg:hidden max-xl:hidden max-sm:hidden mt-[8%] bg-[#091e3a]">
        <h1 className="text-white rounded-sm">Dashboard</h1>
      </div>
      {menu.map((item, index) => {
        // تحقق من الأذونات
        const isHidden =
          permission.find(
            (perm: any) =>
              perm.page === item.permissionPage &&
              perm.actions === "إخفاء الصفحة"
          ) ||
          ((session?.user as { role: string }).role === "user" &&
            item.title === "المستخدمين");

        return (
          <div
            className={`w-[100%]  ${
              activeIndex === index
                ? " rounded-2xl bg-white shadow-2xl shadow-current "
                : "hover:bg-gray-200 hover:shadow-2xl hover:shadow-current" // تطبيق فئة CSS إذا كان العنصر نشطًا
            }`}
            key={index}
          >
            <Link
              style={{
                pointerEvents: isHidden ? "none" : "auto", // استخدم 'auto' كقيمة افتراضية
                color: isHidden ? "gray" : "inherit", // تغيير اللون لجعله يبدو غير نشط
              }}
              href={item.url}
              className="flex items-center"
              onClick={() => handleLinkClick(index)}
            >
              <div className="text-center p-2 w-[100%]">{item.title}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
