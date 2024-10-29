"use client";

import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { departmentType, departmentZodSchema, doctorZodSchema, doctroType } from "@/app/types/types";
import { doctorAdd } from "@/mutations/doctors/addDoctor";
import { message, Modal } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from "@tanstack/react-query";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useState } from "react";
import { departmentAdd } from "@/mutations/department/addDepartment";




interface addDepartProps {
  isAdd: boolean;
  setAdd: (isOpen: boolean) => void;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
}

export default function AddDepart({
  isAdd,
  setAdd,
refetch}: addDepartProps): React.JSX.Element {
  const {
    control,
    handleSubmit,reset,setValue,
    formState: { errors },
  } = useForm<departmentType>({
 
    resolver: zodResolver(departmentZodSchema),
  });
  const setData = () => {
    setValue("depName", "");
    
  };
  const mutation = useMutation({
    mutationKey: ["add-Department"],
    mutationFn: departmentAdd,
    onError: (err: any) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      setData()
      refetch();
      reset();
      
      message.success("تم إضافة القسم بنجاح");
    },
  });
  
const department:departmentType={
  
depName:control._getWatch("depName")
}
  const onSubmit = (data:departmentType) => {
  
    mutation.mutate(data);
  };

  return (
    <div dir="rtl">
      <Modal open={isAdd} closeIcon={false} footer={null}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          إضافة قسم جديد
        </h2>
        <form
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label htmlFor="depName" className="block font-medium mb-2">
  
              اسم القسم
            </label>
            <Controller
              name="depName"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="depName"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  {...field}
                  placeholder="ادخل اسم القسم"
                />
              )}
            />
            {errors.depName && (
              <span className="text-red-500 text-[16px]">
                {errors.depName.message}
              </span>
            )}
          </div>

        
          <div className="col-span-2 flex justify-between items-center">
         
            <Button type="submit" label={"إضافة"} className={`w-[30%]`} />
            <Button
              label={"خروج"}
              onClick={() => setAdd(false)}
              className={`w-[30%] bg-red-700`}
            />
           
          </div>
        </form>
      </Modal>
    </div>
  );
}
