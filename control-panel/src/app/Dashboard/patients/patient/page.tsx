"use client";
import React, { useState } from "react";

import Card from "../../card/page";
import Button from "@/app/components/ui/button";

import DangerDialog from "@/app/components/ui/danger-dialog";
import AddDepart from "../../department/add/page";
import UpdateDeprt from "../../department/update/page";
import { formatDateTime, formatTime } from "@/app/util/dateFormat";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { patientDelete } from "@/mutations/patient/deletePatient";
import { useGetPatient } from "@/queries/patient/useGetAllPatient";

export default function Patient() {
  const [open, setOpen] = useState(false);
  const { isPending, data, refetch } = useGetPatient();


  const screen = (window.innerWidth / 2)/ 4;

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

  return (
    <div className="">
      <DangerDialog
        content={`هل تريد الحذف  حقاً`}
        onClose={Close}
        onConfirm={() => handleDelete(id.id)}
        open={open}
        title={`  سيتم حذف ${id.name} `}
      ></DangerDialog>

      <Button
        onClick={() => setAdd(true)}
        label={`أضافة`}
        className={`hover:bg-green-700 py-[3px]`}
      ></Button>
      <Card
        height={`${window.innerHeight - window.innerHeight / 5}px`}
        type="Table"
        // eslint-disable-next-line react/no-children-prop
        children={
          <div className="table-row-group  border-solid border-slate-200 border-t-[1px]">
            {data?.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white table-row align-middle border-solid border-slate-200 border-b-[3px]"
              >
                <div
                  style={{ width: `${screen}px` }}
                  className="table-cell text-center  align-middle p-[10px] mb-[3px]"
                >
                  <div className=" px-4 whitespace-nowrap   text-center">
                    {index + 1}
                  </div>
                </div>
                <div
                  style={{ width: `${screen}px` }}
                  className="table-cell text-center  align-middle p-[10px] mb-[3px]"
                >
                  <div className=" px-4 whitespace-nowrap    text-center">
                    {item.doctor.doctorName}
                  </div>
                </div>

                <div
                  style={{ width: `${screen}px` }}
                  className="table-cell text-center  align-middle p-[10px] mb-[3px]"
                >
                  <div className=" px-4 whitespace-nowrap   text-center">
                    {item.patient.patName}
                  </div>
                </div>
                <div
                  style={{ width: `${screen}px` }}
                  className="table-cell text-center  align-middle p-[10px] mb-[3px]"
                >
                  <div className=" px-4   text-pretty  text-center">
                    {item.patient.phone}
                  </div>
                </div>
                <div
                  style={{ width: `${screen}px` }}
                  className="table-cell text-center  align-middle p-[10px] mb-[3px]"
                >
                  <div className=" px-4 whitespace-nowrap   text-center">
                    {item.patient.address}
                  </div>
                </div>
                <div
                  style={{ width: `${screen}px` }}
                  className="table-cell text-center  align-middle p-[10px] mb-[3px]"
                >
                  <div className=" px-4 whitespace-nowrap   text-center">
                    {formatDateTime(item.date)}
                  </div>
                </div>
                <div
                  style={{ width: `${screen}px` }}
                  className="table-cell text-cente align-middle   "
                >
                  <div className=" whitespace-nowrap ml-3 flex justify-end  text-center">
                  <Button
                          onClick={() => {
                            setId({ id: item.patient.id, name:item.patient.patName });
                            setOpen(true);
                          }}
                          label={`حذف`}
                          className={`mr-3 bg-red-700 py-[3px]`}
                        ></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        NameOfField={[
          "الرقم",
          " اسم الدكتور",
          "اسم المريض",
          "رقم الهاتف",
          "عنوان المريض",
          " التاريخ",
        ]}
        header=""
      ></Card>
    </div>
  );
}
