"use client";
import React, { useEffect, useState } from "react";

import { useGetDoctor } from "@/queries/doctors/getAllDoctors";

import { useGetDepartments } from "@/queries/department/useGetAllDepartment";

import Button from "@/app/components/ui/button";
import UpdateDeprt from "../../department/update/page";
import UpdateDoctor from "../update/page";
import AddDoctor from "../add/page";

import DangerDialog from "@/app/components/ui/danger-dialog";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { doctorDelete } from "@/mutations/doctors/deleteDoctro";
import Card from "../../card/page";

export default function Doctors() {
  const [open, setOpen] = useState(false);
  const { isPending, data, refetch } = useGetDoctor();

  const [updating, setUpating] = useState(false);

  const screen = window.innerWidth / 2 / 5.8;

  const [add, setAdd] = useState(false);
  const [id, setId] = useState<any>({ id: "", name: "" });
  const [idUpdate, setIdUpate] = useState("");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const Close = () => {
    setOpen(false);
  };

  const handleDropdownToggle = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const mutation = useMutation({
    mutationKey: ["deletDoctor"],
    mutationFn: (id: String) => doctorDelete(id as string),
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
  console.log(data);
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
      <Card width={"100%"}
        type="Table"
        height={`${window.innerHeight - window.innerHeight / 5}px`}
        // eslint-disable-next-line react/no-children-prop
        children={
          <div className="table-row-group l  border-solid border-slate-200 border-t-[1px]">
            {data?.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white table-row  border-solid border-slate-200 border-b-[3px] min-w-ful"
              >
                {" "}
                <div className="table-cell text-center  align-middle p-[10px] mb-[3px]">
                  {index + 1}
                </div>
                {Object.entries(item).map(
                  ([key, value]: [string, any], idx: number) =>
                    key !== "id" && (
                      <div
                        key={idx}
                        className="table-cell text-centeralign-middle p-[10px] mb-[3px]"
                      >
                        {typeof value === "object" &&
                        Array.isArray(value) &&
                        key === "weekwork" ? (
                          <div className=" px-4 whitespace-nowrap   text-center">
                            <button
                              style={{ width: `${screen}px` }}
                              className="flex items-center h-[30px]   overflow-clip   text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => {
                                handleDropdownToggle(index);
                              }}
                            >
                              {value.length > 0 &&
                                `${value.map((day) => day.day).join(", ")}`}
                              <svg
                                className={`w-5 h-5 transition-transform ${
                                  selectedIndex === index ? "rotate-80" : ""
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            {selectedIndex === index && (
                              <div
                                style={{
                                  position: "absolute",
                                  backgroundColor: "white",
                                  border: "1px solid black",

                                  zIndex: 1,
                                }}
                              >
                                {value.map((workItem: any, workIdx: number) => (
                                  <div key={workIdx}>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={true}
                                        onChange={() => ""}
                                      />
                                      {workItem.day}:
                                      <input
                                        type="time"
                                        value={workItem.startTime}
                                        onChange={() => ""}
                                      />{" "}
                                      إلى
                                      <input
                                        type="time"
                                        value={workItem.endTime}
                                        onChange={() => ""}
                                      />
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : typeof value === "object" ? (
                          <div
                            style={{ width: `${screen}px` }}
                            className="px-2 py-2 text-pretty"
                          >
                            {value.depName}
                          </div>
                        ) : (
                          <div
                            style={{ width: `${screen}px` }}
                            className="px-2 py-2 text-pretty whitespace-nowrap"
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
              <AddDoctor refetch={refetch} setAdd={setAdd} isAdd={add} />
            )}
            {updating && (
              <UpdateDoctor
                refetch={refetch}
                id={idUpdate}
                isUpdating={updating}
                setUpdating={setUpating}
              />
            )}
          </div>
        }
        NameOfField={[
          "الرقم",
          "اسم الطبيب",
          "التخصص",
          " القسم",
          "رقم الهاتف",
          "اوقات الدوام",
          "",
        ]}
        header=""
      ></Card>
    </div>
  );
}
