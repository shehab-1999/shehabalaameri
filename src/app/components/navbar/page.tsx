"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

import DangerDialog from "../ui/danger-dialog";
import Button from "../ui/button";
import { signOut, useSession } from "next-auth/react";
export default function NavBar() {
  const [userName, setUserName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [cookie]=useCookies(['userName'])
  useEffect(() => {
    const storedUserName =cookie.userName;
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  const router = useRouter();
  const [cookies, setCookies] = useCookies();
  const {data:session}=useSession()

  
  const handleLogout = async () => {
    setCookies("next-auth.callback-url", "", { path: "/", maxAge: -1 });
    setCookies("next-auth.csrf-token", "", { path: "/", maxAge: -1 });
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("session");
    setCookies("id", "", { path: "/", maxAge: -1 });
    setOpen(true);
    
    await signOut({ callbackUrl: "/login" });
  };
  const Close = () => {
    setOpen(false);
  };
  

  return (
    <div
    
      className="flex justify-between bg-white shadow-md p-[20px]"
      style={{ position: "sticky", top: 0, zIndex: 1 }}
    >
      <div className="flex  items-center gap-10">
  
        <span>Dashboard</span>
      </div>
      <div className="flex gap-5  ">
        <div className="flex items-center gap-2">
          <span className="font-bold font-serif text-[16px]">
            {`مرحبا بك, ${(session?.user as { userName?: string })?.userName }`}!
          </span>
        </div>
        <DangerDialog
          content="هل تريد تسجيل الخروج حقاً"
          onClose={Close}
          onConfirm={handleLogout}
          open={open}
          
          title="تسجيل الخروج"
        ></DangerDialog>
      <Button label={`تسجيل الخروج`} onClick={()=>setOpen(true)} className={`hover:bg-red-700 py-[3px]`} />
        {/* <img
    src="/setting.svg"
    alt="log"
    width={25}
    height={5}
    className="max-sm:hidden bg-red-700"
  /> */}
      </div>
    </div>
  );
}
