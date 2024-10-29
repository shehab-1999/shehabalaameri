"use client";
import React, { useContext, useEffect, useState } from "react";

import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import Card from "../card/page";
import Button from "@/app/components/ui/button";

import DangerDialog from "@/app/components/ui/danger-dialog";
import AddDepart from "./departmentAdd";
import UpdateDeprt from "./departmentUpdate";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { departmentDelete } from "@/mutations/department/deleteDepart";
import { useCookies } from "react-cookie";
import ToastContainer from "@/app/components/ui/toastCobtainer";


import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Permission {
  page: string;
  id: string;
  actions: string;
}

export default function Department() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isPending, data, refetch } = useGetDepartments();
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpating] = useState(false);


  const [success, setSuccess] = useState("");
  const [add, setAdd] = useState(false);
  const [deleteDepartment, setDeleteDepartment] = useState<any>({
    id: "",
    name: "",
  });
  const [idUpdate, setIdUpate] = useState("");
  const [cookies] = useCookies(["authToken"]);
  const {data:session}=useSession()

  const Close = () => {
    setOpen(false);
  };
  const pageName = "Departments";
  const permissions = (
    session?.user as { permissions?: Permission[] }
  )?.permissions?.find((permission) => permission.page === pageName)?.actions;
 
  const mutation = useMutation({
    mutationKey: ["deletDepartment"],
    mutationFn: (id: String) =>
      departmentDelete(id as string, cookies.authToken),

    onError(err: any) {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
     
     
      setOpen(false);
    },
    onSuccess() {
      refetch(), setOpen(false);
      setSuccess("لقد تم الحذف بنجاح");
    },
  });
  const handleDelete = (id: string) => {
    mutation.mutate(id as string);
  };


  const filteredDepartment = data?.filter((department: any) =>
    department.depName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
   <>
   {!permissions?.includes('إخفاء الصفحة')&& <div
      className="overflow-x-auto "
      style={{
        height: `${window.screen.height - window.screen.height / 4}px`,
        direction: "ltr",
      }}
    >
      <DangerDialog
        content={`هل تريد الحذف  حقاً`}
        onClose={Close}
        onConfirm={() => handleDelete(deleteDepartment.id)}
        open={open}
        title={`  سيتم حذف ${deleteDepartment.name} `}
      ></DangerDialog>
      <ToastContainer message={success} type={"success"} />
      <div
        className="flex flex-row gap-3 mt-2 sticky top-0 z-[1] bg-slate-200"
        style={{ direction: "rtl" }}
      >
        <Button
        disabled={!permissions?.includes("إضافة")}
          onClick={() => setAdd(true)}
          className={`mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1 `}
        >
          <img src="/plus.png" width={20} height={20} alt="plus" />
        </Button>

        <input
          type="text"
          placeholder="ابحث عن القسم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 mb-4"
        />
      </div>
      <Card
        height={`${window.innerHeight - window.innerHeight / 5}px`}
        type="Table"
        // eslint-disable-next-line react/no-children-prop
        children={
          <div className="mt-2 mb-2 min-w-full" style={{ direction: "rtl" }}>
            <table className="divide-y w-[100%] font-serif ">
              <thead className="bg-[#91A1B6] sticky top-12  z-[99] max-sm:hidden">
                <tr>
                  <th className={`px-1 py-3 text-white  rounded-tr-[20px]`}>
                    اسماء الأقسام
                  </th>

                  <th className={`px-1 py-3 text-white `}>اسماء الدكاترة </th>

                  <th className={`px-1 py-3 text-white  rounded-tl-[20px]`}>
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-[3px] ">
                {filteredDepartment?.map((department: any, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 max-sm:grid max-sm:grid-flow-row"
                  >
                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold"> اسم القسم </h1>{" "}
                      {department.depName}
                    </td>
                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold"> اسماء الدكاترة</h1>

                      <select name="" id="">
                        {department.doctors.map(
                          (doctor: any, doctroIdx: number) => (
                            <option className="text-center" key={doctroIdx}>
                              {doctor.doctorName}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col`}
                    >
                      <div className="flex justify-center gap-3">
                        <Button
                        disabled={!permissions?.includes("تعديل")}
                          onClick={() => {
                            setIdUpate(department);
                            setUpating(true);
                          }}
                          label={`تعديل`}
                          className={`hover:bg-green-700 mr-5`}
                        ></Button>
                        <Button
                        disabled={!permissions?.includes("حذف")}
                          onClick={() => {
                            setDeleteDepartment({
                              id: department.id,
                              name: department.depName,
                            });
                            setOpen(true);
                          }}
                          label={`حذف`}
                          className={`mr-3 bg-red-700 `}
                        ></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
        }
        NameOfField={[" القسم", "الدكاترة"]}
        header=""
      ></Card>
      {data && add && (
        <AddDepart refetch={refetch} setAdd={setAdd} isAdd={add} />
      )}
      {updating && (
        <UpdateDeprt
          refetch={refetch}
          dataOfDepartment={idUpdate}
          isUpdating={updating}
          setUpdating={setUpating}
        />
      )}
    </div>}
    {permissions?.includes('إخفاء الصفحة') && "غير مخول لدخول هذه الصفحة"}
   </>
  );
}
