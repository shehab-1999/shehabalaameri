"use client";
import React, { useEffect, useState } from "react";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import useGetDoctorById from "@/queries/doctors/useGetDoctorById";
import { AddDoctor } from "@/mutations/doctors/AddDoctor";
export default function Update(Params: any) {
  let NameOfField = [
    "اسم الطبيب",
    "التخصص",
    " القسم",
    "رقم الهاتف",
    "اوقات الدوام",
  ];

  const { data: dataDepartment } = useGetDepartments();
  const [depart, setDepart] = useState(dataDepartment);
  const { isLoading, data } = useGetDoctorById(Params.params.id);
  const [formatData, setFormatData] = useState(data);

  useEffect(() => {
    setFormatData(data);
    setDepart(dataDepartment);
  }, [data]);

  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const defaultTime = "09:00"; // الوقت الافتراضي

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormatData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handledepName = (value: any, name: any) => {
    console.log(name, value);
    setFormatData((prevData: any) => ({
      ...prevData,
      department: { [value]: name },
    }));
  };
  const handleWeekworkChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedWeekwork = formatData.weekwork.map(
      (item: any, idx: number) => {
        if (idx === index) {
          return { ...item, [field]: value };
        }
        return item;
      }
    );

    setFormatData((prevData: any) => ({
      ...prevData,
      weekwork: updatedWeekwork,
    }));
  };

  const handleCheckboxChange = (day: string) => {
    const isChecked = formatData.weekwork.some(
      (work: { day: string }) => work.day.trim() === day.trim()
    );
    if (isChecked) {
      // Remove the day
      setFormatData((prevData: any) => ({
        ...prevData,
        weekwork: prevData.weekwork.filter(
          (work: { day: string }) => work.day.trim() !== day.trim()
        ),
      }));
    } else {
      // Add the day with default times
      setFormatData((prevData: any) => ({
        ...prevData,
        weekwork: [
          ...prevData.weekwork,
          { day, startTime: defaultTime, endTime: defaultTime },
        ],
      }));
    }
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDropdownToggle = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const renderTable = (formatData: any) => (
    <div className="w-[100%] table border-collapse">
      <div style={{ display: "table-header-group" }}>
        <div style={{ display: "table-row" }}>
          {NameOfField?.map((field: any, idx: number) => (
            <div
              key={idx}
              style={{
                width: "calc(100% / " + NameOfField.length + ")",
              }}
              className="table-cell text-center border-solid border-slate-200 border-b-[10px] p-[10px] mb-[3px]"
            >
              {field}
            </div>
          ))}
        </div>
      </div>
      <div className="table-row-group">
        {[formatData]?.map((item: any, index: number) => (
          <div key={index} style={{ display: "table-row" }}>
            {Object.entries(item).map(
              ([key, value]: [string, any], idx: number) =>
                key !== "id" && (
                  <div
                    key={idx}
                    style={{
                      width: "calc(100% / " + (NameOfField.length + 1) + ")",
                    }}
                    className="table-cell text-center align-middle border-solid border-slate-200 border-b-[5px] p-[10px] mb-[3px]"
                  >
                    {typeof value === "object" &&
                    Array.isArray(value) &&
                    key === "weekwork" ? (
                      <>
                        <button
                          className="flex items-center h-[30px]   overflow-clip w-full   text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            handleDropdownToggle(index);
                          }}
                        >
                          {selectedIndex == index
                            ? `${value.map((day) => day.day.trim()).join(", ")}`
                            : value.length > 0
                            ? `${value.map((day) => day.day.trim()).join(", ")}`
                            : ""}
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
                              width: "320px",
                            }}
                          >
                            {daysOfWeek.map((day) => (
                              <div key={day}>
                                <label>
                                  {formatData.weekwork.some(
                                    (work: { day: string }) =>
                                      work.day.trim() === day.trim()
                                  ) ? (
                                    <></>
                                  ) : (
                                    <>
                                      <input
                                        type="checkbox"
                                        checked={formatData.weekwork.some(
                                          (work: { day: string }) =>
                                            work.day.trim() === day.trim()
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(day.trim())
                                        }
                                      />
                                      {day.trim()}
                                      <input
                                        type="time"
                                        value={defaultTime}
                                        onChange={(e) =>
                                          handleWeekworkChange(
                                            formatData.weekwork.length,
                                            "startTime",
                                            e.target.value
                                          )
                                        }
                                      />
                                      إلى
                                      <input
                                        type="time"
                                        value={defaultTime}
                                        onChange={(e) =>
                                          handleWeekworkChange(
                                            formatData.weekwork.length,
                                            "endTime",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </>
                                  )}
                                </label>
                              </div>
                            ))}
                            {value.map((work, index) => (
                              <div key={index}>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={formatData.weekwork
                                      .map((item: { day: any }) =>
                                        item.day.trim()
                                      )
                                      .includes(work.day.trim())}
                                    onChange={() =>
                                      handleCheckboxChange(work.day.trim())
                                    }
                                  />
                                  {work.day.trim()}:
                                  <input
                                    type="time"
                                    value={work.startTime}
                                    onChange={(e) =>
                                      handleWeekworkChange(
                                        index,
                                        "startTime",
                                        e.target.value
                                      )
                                    }
                                  />
                                  إلى
                                  <input
                                    type="time"
                                    value={work.endTime}
                                    onChange={(e) =>
                                      handleWeekworkChange(
                                        index,
                                        "endTime",
                                        e.target.value
                                      )
                                    }
                                  />
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : key == "department" ? (
                      <div>
                        <select
                          className="p-[10px] bg-transparent text-black font-serif font-bold outline-none border-solid border-[1px] border-slate-100 rounded-[3px]"
                          name="depName"
                          onChange={(e) => {
                            handledepName(e.target.name, e.target.value);
                          }}
                        >
                          {depart?.map((department: any) => (
                            <option
                              key={department.id}
                              value={department.depName}
                            >
                              {department.depName}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <input
                        type="text"
                        name={`${Object.keys([formatData][0])[idx]}`}
                        value={value}
                        onChange={handleInputChange}
                      ></input>
                    )}
                  </div>
                )
            )}
            <div
              style={{}}
              className="table-cell align-middle  text-center   border-solid border-slate-200 border-b-[5px] p-[10px] mb-[3px]"
            >
              <div className="flex flex-row gap-3">
                <button
                  onClick={() => {
                    console.log(formatData);

                    handleUpdate(formatData, item.id);
                  }}
                  className="bg-yellow-500 text-white text flex justify-items-center rounded"
                >
                  تعديل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const handleUpdate = (dataa: any, id: string) => {
    console.log(id);

    AddDoctor(dataa);
  };
  return (
    <div className="w-[100%] table border-collapse">
      {data && formatData && renderTable(formatData)}
    </div>
  );
}
