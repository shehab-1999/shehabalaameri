"use client";
import React, { useState } from "react";

import { useGetDoctor } from "@/queries/doctors/getAllDoctors";

import Button from "@/app/components/ui/button";

import UpdateDoctor from "./doctorUpdate";
import AddDoctor from "./doctorAdd";

import DangerDialog from "@/app/components/ui/danger-dialog";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { doctorDelete } from "@/mutations/doctors/deleteDoctor";
import Card from "../card/page";

import { useCookies } from "react-cookie";
import ToastContainer from "@/app/components/ui/toastCobtainer";

import { useSession } from "next-auth/react";

import { formatArabicTime } from "@/app/util/dateFormat";

export default function Doctors() {
  const [open, setOpen] = useState(false);
  const { isLoading, error, data, refetch } = useGetDoctor();
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpating] = useState(false);
  const [success, setSuccess] = useState("");

  const [add, setAdd] = useState(false);
  const [id, setId] = useState<any>({ id: "", name: "" });
  const [idUpdate, setIdUpate] = useState("");
  const { data: session } = useSession();

  const pageName = "Doctors";
  const permissions = (
    session?.user as { permissions?: any }
  )?.permissions?.find(
    (permission: any) => permission.page === pageName
  )?.actions;

  const Close = () => {
    setOpen(false);
  };
  const headTalble = [
    "الصوره",
    "اسم الدكتور",
    "التخصص",
    "اسم القسم",
    "رقم الهاتف",
    "معلومات عن الدكتور",
    "اوقات الدوام",
    "الإجراءات",
  ];
  const mutation = useMutation({
    mutationKey: ["deletDoctor"],
    mutationFn: (id: String) => doctorDelete(id as string),
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

  if (isLoading) return <p>جاري جلب بيانات ...</p>;
  if (error) return <p>خطأ في جلب بيانات ...</p>;

  const filteredDoctor = data?.filter((doctor: any) =>
    doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {!permissions?.includes("إخفاء الصفحة") && (
        <div
          className="overflow-y-scroll rounded-br-2xl rounded-bl-2xl"
          style={{
            height: `${window.screen.height - window.screen.height / 3.8}px`,
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
          <ToastContainer message={success} type={"success"} />
          <div
            className="flex flex-row gap-3 mt-2 sticky top-0 z-[1] bg-slate-200"
            style={{ direction: "rtl" }}
          >
            <Button
              disabled={!permissions?.includes("إضافة")}
              onClick={() => setAdd(true)}
              className={`mr-3 py-[3px] rounded-[10px]  border border-solid h-9 mt-1`}
            >
              <img src="/plus.png" width={20} height={20} alt="plus" />
            </Button>

            <input
              type="text"
              placeholder="ابحث عن طبيب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 mb-4"
            />
          </div>

          <Card
            type="Table"
            // eslint-disable-next-line react/no-children-prop
            children={
              <div
                className="mt-2 mb-2 min-w-full  border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl  "
                style={{ direction: "rtl" }}
              >
                <table className="divide-y w-full">
                  <thead className="bg-[#91A1B6]  sticky top-12  z-[99] max-md:hidden table-header-group">
                    <tr>
                      {headTalble.map((header, index) => (
                        <th
                          key={index}
                          className={`px-1 py-3 text-white  ${
                            index === 0
                              ? "rounded-tr-[20px]"
                              : index === 7
                              ? "rounded-tl-[20px]"
                              : ""
                          }`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y-[3px]">
                    {filteredDoctor?.map((doctor: any, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 max-md:grid max-md:grid-flow-row"
                      >
                        {[
                          doctor.img ? (
                            <img
                              height={50}
                              width={50}
                              src={`/images/${doctor.img}`}
                              className="rounded-full"
                              alt="Doctor"
                            />
                          ) : (
                            "لاتوجد صوره"
                          ),
                          doctor.doctorName,
                          doctor.specialist,
                          doctor.department.depName,
                          doctor.phone,
                          doctor.information,
                          <select key={index}>
                            {doctor.weekwork.map(
                              (workItem: any, idx: number) => (
                                <option key={idx}>
                                  {workItem.day} يبدأ من{" "}
                                  {formatArabicTime(workItem.startTime)} وينتهي{" "}
                                  {formatArabicTime(workItem.endTime)}
                                </option>
                              )
                            )}
                          </select>,
                          <div
                            key={index}
                            className="flex justify-center gap-3"
                          >
                            <Button
                              disabled={!permissions?.includes("تعديل")}
                              onClick={() => {
                                setIdUpate(doctor);
                                setUpating(true);
                              }}
                              label={`تعديل`}
                              className={`hover:bg-green-700 mr-5`}
                            />
                            <Button
                              disabled={!permissions?.includes("حذف")}
                              onClick={() => {
                                setId({
                                  id: doctor.id,
                                  name: doctor.doctorName,
                                });
                                setOpen(true);
                              }}
                              label={`حذف`}
                              className={`mr-3 bg-red-700`}
                            />
                          </div>,
                        ].map((content, idx) => (
                          <td
                            key={idx}
                            className="px-1 py-4 text-center bg-white text-balance max-md:grid max-md:grid-flow-col max-md:justify-between max-md:px-10 max-md:border-gray-100 max-md:border-solid max-md:border-[3px]"
                          >
                            <h1 className="sm:hidden font-bold">
                              {headTalble[idx]}
                            </h1>
                            {content}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
            header=""
          ></Card>
          {data && add && (
            <AddDoctor refetch={refetch} setAdd={setAdd} isAdd={add} />
          )}
          {updating && (
            <UpdateDoctor
              refetch={refetch}
              doctorData={idUpdate}
              isUpdating={updating}
              setUpdating={setUpating}
            />
          )}
        </div>
      )}
      {permissions?.includes("إخفاء الصفحة") && "غير مخول لدخول هذه الصفحة"}
    </>
  );
}
