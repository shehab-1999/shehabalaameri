import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { doctorZodSchema, doctroType } from "@/app/types/types";
import { message, Modal } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useState } from "react";
import { addDoctor } from "@/mutations/doctors/AddDoctor";

const daysOfWeek = [
  "السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة",
];

interface WeekWork {
  day: string;
  startTime: string;
  endTime: string;
}

interface doctorProps {
  isAdd: boolean;
  setAdd: (isOpen: boolean) => void;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
}
// eslint-disable-next-line react-hooks/rules-of-hooks
const [dropdownOpen, setDropdownOpen] = useState(false);
function WeekDayInput({ day, fields, append, remove, update, control }: {
  day: string;
  fields: WeekWork[];
  append: (value: WeekWork) => void;
  remove: (index: number) => void;
  update: (index: number, value: WeekWork) => void;
  control: any; // يجب تعديل هذا النوع حسب الهيكل الخاص بك
}) {
  const index = fields.findIndex(work => work.day === day);

  return (
    <div className="flex items-center  p-2 h-[30px] hover:bg-gray-100">
      <input
        type="checkbox"
        className="mr-2"
        checked={index > -1}
        onChange={(e) => {
          if (e.target.checked) {
            append({ day, startTime: "", endTime: "" });
          } else if (index > -1) {
            remove(index);
          }
        }}
      />
      <label>{day}</label>
      {index > -1 && (
  <>
    <Controller
      name={`weekwork.${index}.startTime`}
      control={control}
      render={({ field }) => (
        <Input
          type="time"
          className="ml-2 p-[10px] h-[20px] text-black"
          {...field}
        />
      )}
    />
    إلى
    <Controller
      name={`weekwork.${index}.endTime`}
      control={control}
      render={({ field }) => (
        <Input
          type="time"
          className="ml-2 p-[10px] h-[20px] text-black"
          {...field}
        />
      )}
    />
  </>
)}
    </div>
  );
}

export default function DoctorAdd({
  isAdd,
  setAdd,
  refetch,
}: doctorProps): React.JSX.Element {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<doctroType>({
    resolver: zodResolver(doctorZodSchema),
  });

  const { data: dataDepartment } = useGetDepartments();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "weekwork",
  });

  const mutation = useMutation({
    mutationKey: ["new-doctor"],
    mutationFn: addDoctor,
    onError: (err: any) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      refetch();
      setAdd(false);
      message.success("تم إضافة الدكتور بنجاح");
    },
  });

  const onSubmit = (data: doctroType) => {
    mutation.mutate(data);
  };

  return (
    <div dir="rtl">
      <Modal open={isAdd} closeIcon={false} footer={null}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          إضافة مستخدم جديد
        </h2>
        <form
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label htmlFor="doctorName" className="block font-medium mb-2">
              الاسم
            </label>
            <Controller
              name="doctorName"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="doctorName"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  {...field}
                  placeholder="ادخل اسم الدكتور"
                />
              )}
            />
            {errors.doctorName && (
              <span className="text-red-500 text-[16px]">
                {errors.doctorName.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="specialist" className="block font-medium mb-2">
              التخصص
            </label>
            <Controller
              name="specialist"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="specialist"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  {...field}
                  placeholder="ادخل التخصص"
                />
              )}
            />
            {errors.specialist && (
              <span className="text-red-500 text-[16px]">
                {errors.specialist.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium mb-2">
              رقم الهاتف
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="phone"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  {...field}
                  placeholder="ادخل رقم الهاتف"
                />
              )}
            />
            {errors.phone && (
              <span className="text-red-500 text-[16px]">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="depName" className="block font-medium mb-2">
              اسم القسم
            </label>
            <Controller
              name="department.depName"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                >
                  {dataDepartment?.map((depart: any) => (
                    <option key={depart.depName} value={depart.depName}>
                      {depart.depName}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.department?.depName && (
              <span className="text-red-500 text-[16px]">
                {errors.department.depName.message}
              </span>
            )}
          </div>

          <h3 className="col-span-2 font-bold mb-2">ساعات العمل الأسبوعية</h3>
          <div className="col-span-2 mb-4 relative">
            <label
              className="flex items-center p-[10px] bg-transparent  overflow-clip   text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {dropdownOpen
                ? `${fields.map((day) => day.day.trim()).join(", ")}`
                : fields.length > 0
                ? `${fields.map((day) => day.day.trim()).join(", ")}`
                : ""}

              <svg
                className={`w-5 h-5 transition-transform ${
                  dropdownOpen ? "rotate-80" : ""
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
            </label>
            {
              <div
                className={`absolute z-1 ${
                  !dropdownOpen && "hidden"
                }  bg-white text-xl shadow-lg border border-gray-300`}
              >
                 {daysOfWeek.map(day => (
            <WeekDayInput
              key={day}
              day={day}
              fields={fields}
              append={append}
              remove={remove}
              update={update}
              control={control}
            />
          ))}
              </div>
            }
          </div>
       
          
          <div className="col-span-2 flex justify-between items-center">
            <Button type="submit" label={"إضافة"} className={`w-[30%]`} />
            <Button
              label={"إلغاء"}
              onClick={() => setAdd(false)}
              className={`w-[30%] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}