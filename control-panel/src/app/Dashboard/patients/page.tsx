'use client'
import React, { useContext } from "react";
import { formatDate, formatDateTime } from "../../util/dateFormat";
import { useGetAllOpponInToday } from "@/queries/oppo/useGetAllPatients";
import { PermissionContext } from "../../permision/hashpermision";

export default function AppointmentToday() {
  const { data, error, isLoading } = useGetAllOpponInToday();

  if (error) {
    return (
      <div className="text-red-500 text-center">حدث خطأ أثناء جلب المواعيد</div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-gray-400 text-center">جارٍ تحميل المواعيد...</div>
    );
  }

  return (
    <div className="w-[100%] font-serif"> 
      <div>
        <table className="min-w-full divide-y divide-gray-400">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50  text-[16px]  text-gray-500 uppercase tracking-wider w-1/5 ">
                الاسم
              </th>
              <th className="px-6 py-3 bg-gray-50  text-[16px] font-medium text-gray-500 uppercase tracking-wider w-1/5">
                الجنس
              </th>
              <th className="px-6 py-3 bg-gray-50  text-[16px] font-medium text-gray-500 uppercase tracking-wider w-1/5">
                الطبيب المعالج
              </th>
              <th className="px-6 py-3 bg-gray-50  text-[16px] font-medium text-gray-500 uppercase tracking-wider w-1/5">
                العنوان
              </th>
              <th className="px-6 py-3 bg-gray-50  text-[16px] font-medium text-gray-500 uppercase tracking-wider w-1/5">
                التاريخ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((oppointement) => (
              <tr key={oppointement.patient.id}>
                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center">
                  {oppointement.patient.patName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center">
                  {oppointement.patient.gender ?? "can't find gender "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center">
                  {oppointement.doctor.doctorName ?? "can't find doctor"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center">
                  {oppointement.patient.address ?? "can't find address "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center font-sans">
                  {formatDateTime(oppointement.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
