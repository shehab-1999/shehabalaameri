"use client";

import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { departmentType, departmentZodSchema } from "@/app/types/types";

import { message, Modal } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";

import { useEffect } from "react";

import { departmentUpdate } from "@/mutations/department/updateDepartment";
import useGetDepartmentById from "@/queries/department/useGetDepartmentById";

interface departmentProps {
  setUpdating: (isOpen: boolean) => void;

  isUpdating: boolean;

  id: string;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
}

export default function UpdateDeprt({
  isUpdating,
  setUpdating,
  id,
  refetch,
}: departmentProps): React.JSX.Element {
  const { data: dataOfDepartment } = useGetDepartmentById(id);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<departmentType>({
    resolver: zodResolver(departmentZodSchema),
  });

  useEffect(() => {
    if (dataOfDepartment) {
      setValue(
        "depName",
        dataOfDepartment.map((department: any) => department.depName)
      );
    }
  }, [dataOfDepartment, setValue]);

  const mutation = useMutation({
    mutationKey: ["updatedepartment"],

    // eslint-disable-next-line react-hooks/rules-of-hooks
    mutationFn: (data: departmentType) => departmentUpdate(data, id), // استخدم الدالة المعدلة
    onError: (err: any) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      refetch();
      setUpdating(false);
      message.success("تم تحديث اسم القسم بنجاح");
    },
  });

  const onSubmit = (data: departmentType) => {
    mutation.mutate(data);
  };

  return (
    <div dir="rtl">
      <Modal open={isUpdating} closeIcon={false} footer={null}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          تعديل قسم جديد
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
            <Button type="submit" label={"تعديل"} className={`w-[40%]`} />
            <Button
              label={"إلغاء"}
              onClick={() => setUpdating(false)}
              className={`w-[40%] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
