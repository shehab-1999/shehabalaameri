"use client";
import React, { useState } from "react";

import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import Card from "../card/page";
import Button from "@/app/components/ui/button";

import DangerDialog from "@/app/components/ui/danger-dialog";
import AddDepart from "./add/page";
import UpdateDeprt from "./update/page";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { departmentDelete } from "@/mutations/department/DeleteDepart";

export default function Doctors() {
  const [open, setOpen] = useState(false);
  const { isPending, data, refetch } = useGetDepartments();

  const [updating, setUpating] = useState(false);

  const screen = window.innerWidth / 2 / 2;

  const [add, setAdd] = useState(false);
  const [id, setId] = useState<any>({ id: "", name: "" });
  const [idUpdate, setIdUpate] = useState("");

  const Close = () => {
    setOpen(false);
  };
  const mutation = useMutation({
    mutationKey: ["deletDepartment"],
    mutationFn: (id: String) => departmentDelete(id as string),
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
                <div className="table-cell text-center  align-middle p-[10px] mb-[3px]">
                  {index + 1}
                </div>

                {Object.entries(item).map(
                  ([key, value]: [string, any], idx: number) =>
                    key !== "id" && (
                      <div
                        key={idx}
                        className="table-cell text-center  align-middle p-[10px] mb-[3px]"
                      >
                        {Array.isArray(value) && key === "doctors" ? (
                          <div className=" px-4 whitespace-nowrap   text-center">
                            <select name="" id="">
                              {value.map((doctro: any, doctroIdx) => (
                                <option className="text-center" key={doctroIdx}>
                                  {doctro.doctorName}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div
                            style={{ width: `${screen}px` }}
                            className="mx-10 py-2 text-pretty whitespace-nowrap"
                          >
                            {value}
                          </div>
                        )}
                      </div>
                    )
                )}
                {
                  <div
                    style={{ width: `${screen}px` }}
                    className="table-cell text-cente align-middle   "
                  >
                    <div className=" whitespace-nowrap ml-3 flex justify-end  text-center">
                      <Button
                        onClick={() => {
                          setIdUpate(item.id);

                          setUpating(true);
                        }}
                        label={`تعديل`}
                        className={`hover:bg-green-700 py-[3px]`}
                      ></Button>

                      <Button
                        onClick={() => {
                          setId({ id: item.id, name: Object.values(item)[1] });
                          setOpen(true);
                        }}
                        label={`حذف`}
                        className={`mr-3 bg-red-700 py-[3px]`}
                      ></Button>
                    </div>
                  </div>
                }
              </div>
            ))}

            {data && add && (
              <AddDepart refetch={refetch} setAdd={setAdd} isAdd={add} />
            )}
            {updating && (
              <UpdateDeprt
                refetch={refetch}
                id={idUpdate}
                isUpdating={updating}
                setUpdating={setUpating}
              />
            )}
          </div>
        }
        NameOfField={["الرقم", " القسم", "الدكاترة",""]}
        header=""
      ></Card>
    </div>
  );
}
