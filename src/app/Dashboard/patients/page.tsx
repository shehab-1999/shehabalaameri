"use client";
import React, { useState } from "react";

import Card from "../card/page";
import Button from "@/app/components/ui/button";

import DangerDialog from "@/app/components/ui/danger-dialog";
import AddDepart from "../department/departmentAdd";
import UpdateDeprt from "../department/departmentUpdate";
import { formatDateTime, formatTime } from "@/app/util/dateFormat";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { patientDelete } from "@/mutations/patient/deletePatient";
import { useGetPatient } from "@/queries/patient/useGetAllPatient";

import { useSession } from "next-auth/react";

interface Permission {
  page: string;
  id: string;
  actions: string;
}
export default function Patient() {
  const { data: session } = useSession();
  const pageName = "Patients";
  const permissions = (
    session?.user as { permissions?: Permission[] }
  )?.permissions?.find((permission) => permission.page === pageName)?.actions;

  const [open, setOpen] = useState(false);

  const { isPending, data, refetch } = useGetPatient();

  const [searchTerm, setSearchTerm] = useState("");

  const [add, setAdd] = useState(false);
  const [id, setId] = useState<any>({ id: "", name: "" });

  const Close = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationKey: ["deletPatient"],
    mutationFn: (id: String) => patientDelete(id as string),
    onError(error: any) {
      message.error(error.message);
    },
    onSuccess() {
      refetch(), setOpen(false);
    },
  });
  const handleDelete = (id: string) => {
    mutation.mutate(id as string);
  };
  const filteredPatient = data?.filter((patient: any) =>
    patient.patient.patName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {!permissions?.includes("إخفاء الصفحة") && (
        <div
          className="overflow-x-auto"
          style={{
            height: `${window.innerHeight - window.innerHeight / 5}px`,
            direction: "ltr",
          }}
        >
          <DangerDialog
            content={`هل تريد الحذف  حقاً`}
            onClose={Close}
            onConfirm={() => handleDelete(id.id)}
            open={open}
            title={`  سيتم حذف ${id.name} `}
          ></DangerDialog>
          <div
            className="flex flex-row gap-3 mt-2 sticky top-0 z-[1] bg-slate-200"
            style={{ direction: "rtl" }}
          >
            <Button
              disabled={!permissions?.includes("إضافة")}
              onClick={() => setAdd(true)}
              className={`mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1`}
            >
              <img src="/plus.png" width={20} height={20} alt="plus" />
            </Button>

            <input
              type="text"
              placeholder="ابحث عن المريض..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 mb-4"
            />
          </div>
          <Card
            height={`${window.screen.height - window.screen.height / 5}px`}
            NameOfField={[
              "الرقم",
              "اسم الدكتور المعالج",
              "اسم المريض",
              " رقم هاتف المريض",
              "عنوان المريض",
              " تاريخ الموعد",
            ]}
            type="Table"
            // eslint-disable-next-line react/no-children-prop
            children={
              <div
                className="mt-2 mb-2 min-w-full"
                style={{ direction: "rtl" }}
              >
                <table className="divide-y w-[100%] ">
                  <thead className="bg-[#91A1B6] sticky top-12  z-[99] max-sm:hidden">
                    <tr>
                      <th className={`px-1 py-3 text-white  rounded-tr-[20px]`}>
                        اسم المريض
                      </th>

                      <th className={`px-1 py-3 text-white `}>
                        {" "}
                        الدكتور المعالح
                      </th>

                      <th className={`px-1 py-3 text-white `}>هاتف المريض</th>
                      <th className={`px-1 py-3 text-white `}>عنوان المريض</th>
                      <th className={`px-1 py-3 text-white `}>
                        {" "}
                        موعد الدكتور{" "}
                      </th>

                      <th className={`px-1 py-3 text-white  rounded-tl-[20px]`}>
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-[3px] ">
                    {filteredPatient?.map((patient: any, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 max-sm:grid max-sm:grid-flow-row"
                      >
                        <td
                          className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                        >
                          <h1 className="sm:hidden font-bold"> اسم المريض</h1>{" "}
                          {patient.patient.patName}
                        </td>
                        <td
                          className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                        >
                          <h1 className="sm:hidden font-bold">
                            {" "}
                            {"الدكتور المعالج"}
                          </h1>

                          {patient.doctor.doctorName}
                        </td>

                        <td
                          className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                        >
                          <h1 className="sm:hidden font-bold">هاتف المريض</h1>{" "}
                          {patient.patient.phone}
                        </td>
                        <td
                          className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                        >
                          <h1 className="sm:hidden font-bold">عنوان المريض</h1>{" "}
                          {patient.patient.address}
                        </td>
                        <td
                          className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                        >
                          <h1 className="sm:hidden font-bold">موعد الدكتور</h1>{" "}
                          {formatDateTime(patient.date)}
                        </td>
                        <td
                          className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col`}
                        >
                          <div className="flex justify-center gap-3">
                            <Button
                              disabled={!permissions?.includes("حذف")}
                              onClick={() => {
                                setId({
                                  id: patient.patient.id,
                                  name: patient.patient.patName,
                                });
                                setOpen(true);
                              }}
                              label={`حذف`}
                              className={`mr-3 bg-red-700 py-[3px]`}
                            ></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
            header=""
          ></Card>
        </div>
      )}

      {permissions?.includes("إخفاء الصفحة") && "غير مخول لدخول هذه الصفحة"}
    </>
  );
}
