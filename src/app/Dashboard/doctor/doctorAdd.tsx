import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorZodSchema, doctroType } from "@/app/types/types";
import { doctorAdd } from "@/mutations/doctors/addDoctor";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useMutation } from "@tanstack/react-query";
import { message, Modal } from "antd";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import WeekDayInput from "./WeekDayInput";
import AddDepart from "../department/departmentAdd";
import {useRouter} from "next/navigation";
const daysOfWeek = [
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
];

interface doctorProps {
  isAdd: boolean;
  setAdd: (isOpen: boolean) => void;
  refetch: any;
}

export default function AddDoctor({ isAdd, setAdd, refetch }: doctorProps) {
  const router=useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [doctroImageUrl, setDoctroImageUrl] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<doctroType>({ resolver: zodResolver(doctorZodSchema) });
  const { data: dataDepartment } = useGetDepartments();
 
  const { fields, append, remove, } = useFieldArray({
    control,
    name: "weekwork",
  });
  const mutation = useMutation({
    mutationKey: ["add-doctor"],
    mutationFn: (formatDate: any) => doctorAdd(formatDate),
    onError: (err: any) => {
      message.error(err.message || "حدث خطأ غير متوقع");
    },
    onSuccess: () => {
      setDataDoctor();
      refetch();
      reset();
      message.success("تم إضافة الدكتور بنجاح");
    },
  });
  const setDataDoctor = () => {
    setValue("doctorName", "");
    setValue("specialist", "");
    setValue("phone", "");
    setValue("department.depName", "");
    setDoctroImageUrl(null);
    setValue("information", "");
    fields.pop();
    setValue("weekwork", []);
  };

  const onSubmit = (data: doctroType) => {
    const formData = new FormData();
    formData.append("doctorName", data.doctorName);
    formData.append("specialist", data.specialist);
    if (data.img) {
      formData.append("img", data.img);
    }
    formData.append("phone", data.phone);
    formData.append("information", data.information as any);
    if (data.department) {
      formData.append("department[depName]", data.department.depName);
    }
    formData.append("number", `${data.weekwork.length}`);
    if (data.weekwork) {
      data.weekwork.forEach((workItem, index) => {
        formData.append(`weekwork[${index}][day]`, workItem.day);
        formData.append(`weekwork[${index}][startTime]`, workItem.startTime);
        formData.append(`weekwork[${index}][endTime]`, workItem.endTime);
      });
    }
    mutation.mutate(formData);
  };

  return (
   
   dataDepartment?.length!==0 ? <div dir="rtl">
      <Modal
        open={isAdd}
        closeIcon={false}
        footer={null}
        width={600}
        className="top-2"
      >
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          إضافة دكتور جديد
        </h2>
        <form
          dir="rtl"
          className="grid grid-cols-7 gap-2 justify-start font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 col-span-3 ">
            <label htmlFor="doctorName" className="block font-medium mb-2">
              الاسم
            </label>
            <Controller
              defaultValue=""
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

          <div className="mb-4 col-span-2">
            <label htmlFor="specialist" className="block font-medium mb-2">
              التخصص
            </label>
            <Controller
              defaultValue=""
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
          <div className="mb-4 col-span-2">
            <label htmlFor="depName" className="block font-medium mb-2">
              اسم القسم
            </label>
            <Controller
              defaultValue=""
              name="department.depName"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full  border-[2px] border-[#cacfd5] rounded-[7px]  py-[10px] px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                >
                  <option>{"إختر القسم"}</option>
                  {dataDepartment?.map((depart: any) => (
                    <option key={depart.depName} value={depart.depName.trim()}>
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
          <div className="mb-4 col-span-2">
            <label htmlFor="phone" className="block font-medium mb-2">
              رقم الهاتف
            </label>
            <Controller
              defaultValue=""
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

          <div className=" col-span-5 mb-4 relative">
            <h3 className="font-bold mb-2"> ساعات العمل الأسبوعية </h3>

            <label
              className="flex items-center p-[10px] bg-transparent py-[11px] overflow-clip  border-[2px] border-[#cacfd5] rounded-[7px]  text-gray-700 bg-white  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {dropdownOpen
                ? `${fields.map((day) => day.day.trim()).join(", ")}`
                : fields.length > 0
                ? `${fields.map((day) => day.day.trim()).join(", ")}`
                : ""}

<h1 className={` ${dropdownOpen?`rotate-[180deg]`:`rotate-[270deg]`} font-bold font-serif pl-1 text-[20px]`} > ^ </h1>
            </label>
            {
              <div
                className={`absolute z-1 ${
                  !dropdownOpen && "hidden"
                }  bg-white text-xl shadow-lg border border-gray-300`}
              >
                {daysOfWeek.map((day) => (
                  <WeekDayInput
                    key={day}
                    day={day}
                    fields={fields}
                    append={append}
                    remove={remove}
                    control={control}
                  />
                ))}
              </div>
            }

            {errors.weekwork && (
              <>
                <span className="text-red-500 text-[16px]">
                  {errors.weekwork.message ? (
                    "يجب إدخال اوقات الدوام"
                  ) : (
                    <>
                      <div className="grid grid-cols-5">
                        <h1 className="col-span-2 flex">
                          يجب ادخال أوقات بدء الدوام
                        </h1>
                        <h1 className="col-span-2 ">وانتهاءالدوام</h1>
                      </div>
                    </>
                  )}
                </span>
              </>
            )}
          </div>

          <div className="mb-1 row-span-3 col-span-3 ">
            <label htmlFor="img" className="block ">
              الصورة
            </label>
            <label
              htmlFor="img-preview"
              className="cursor-pointer items-center bg-black"
            >
              {doctroImageUrl ? (
                <img
                  src={doctroImageUrl}
                  alt="Current"
                  className=" border h-[200px] border-gray-300 row-span-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                />
              ) : (
                <div className="w-full h-[200px] border border-gray-300 rounded-md flex items-center justify-center">
                  <span>اختر صورة</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="img-preview"
              className="hidden" // جعل الإدخال غير مرئي
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setDoctroImageUrl(reader.result as string);
                    setValue("img", file as any); // تحديث قيمة الصورة في النموذج
                  };
                  reader.readAsDataURL(file);
                } else {
                  setValue("img", null); // إذا لم يتم اختيار ملف، قم بتحديث القيمة إلى null
                }
              }}
            />
          </div>

          <div className=" col-span-4">
            <label htmlFor="title" className="block font-medium">
              معلومات عن الدكتور
            </label>
            <Controller
              defaultValue=""
              name="information"
              control={control}
              render={({ field }) => (
                <textarea
                  id="title"
                  className="w-full border border-gray-300 rounded-md h-[200px]  row-span-5  focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل معلومات عن الدكتور"
                  {...field}
                />
              )}
            />
            {errors.information && (
              <span className="text-red-500 text-[16px]">
                {errors.information.message}
              </span>
            )}
          </div>

          <div className="col-span-7 flex justify-between items-center">
            <Button type="submit" label={"إضافة"} className={`w-[40%]`} />

            <Button
              label={"خروج"}
              onClick={() => setAdd(false)}
              className={`w-[40%] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>:<Modal  open={isAdd}
        closeIcon={false}
        footer={null}
       
        >
      
    <div><h1 className="font-serif text-[20px] text-center text-red-700 py-5 font-bold" >لإضافة دكاترة يرجي إضافة قسم اولا</h1>
    
    <Button type="submit"  label={"انقر هنا لأضافة قسم"} onClick={()=>{
      router.push('department')
    }} className={`w-[40%] justify-items-center items-center text-center justify-center align-middle `} />
    </div>
      </Modal>
   
   
  );
}
 