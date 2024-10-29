import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { addNewsType, newsZodSchema } from "@/app/types/types";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { message, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNews } from "@/mutations/news/addNews";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";

interface newsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function NewsAdd({
  isOpen,
  setIsOpen,
  refetch,
}: newsProps): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm({
    defaultValues: {
      headline: "",
      title: "",
      img: null,
      user: "",
      department: "",
    },
    resolver: zodResolver(newsZodSchema),
  });
  const [isFormValid, setIsFormValid] =React.useState(false);
  useEffect(()=>{
    setIsFormValid(isValid&&Object.keys(errors).length==0)
  
  },[isValid,errors]);
  const { data: departmentNames } = useGetDepartments();
  const mutation = useMutation({
    mutationKey: ["news-add"],
    mutationFn: AddNews,
    onError: (err) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      setIsOpen(false);
      refetch();
      message.success("تم إضافة الاخبار بنجاح");
    },
  });

  const onSubmit = async (data: addNewsType) => {
    const formData = new FormData();
    formData.append("headline", data.headline);
    formData.append("title", data.title);

    if (data.img) {
      formData.append("img", data.img);
    }

    formData.append("user", data.user);
    formData.append("department", data.department);

    mutation.mutate(formData);
  };

  const depNames = departmentNames?.map((name) => name.depName);

  return (
    <div dir="rtl">
      <Modal open={isOpen} closeIcon={false} footer={null}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          إضافة اخبار جديدة
        </h2>
        <form
          encType="multipart/form-data"
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* العنوان */}
          <div className="mb-1">
            <label htmlFor="headline" className="block font-medium mb-2">
              العنوان
            </label>
            <Controller
              name="headline"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="headline"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  {...field}
                  placeholder="ادخل العنوان"
                />
              )}
            />
            {errors.headline && (
              <span className="text-red-500 text-[16px]">
                {errors.headline.message}
              </span>
            )}
          </div>

          <div className="mb-1 row-span-2">
            <label htmlFor="title" className="block font-medium mb-2">
              المحتوى
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <textarea
                  id="title"
                  className="w-full border border-gray-300 rounded-md py-2 h-[150px] px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل المحتوى"
                  {...field}
                />
              )}
            />
            {errors.title && (
              <span className="text-red-500 text-[16px]">
                {errors.title.message}
              </span>
            )}
          </div>

      
          <div className="mb-1">
            <label htmlFor="img" className="block font-medium mb-2">
              الصورة (اختياري)
            </label>
            <Controller
              name="img"
              control={control}
              render={({ field: { onChange, ref } }) => (
                <Input
                  type="file"
                  id="img"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    onChange(file);
                  }}
                  ref={ref}
                />
              )}
            />
            {errors.img && (
              <span className="text-red-500 text-[16px]">
                {errors.img.message}
              </span>
            )}
          </div>

       
          <div className="mb-1">
            <label htmlFor="department" className="block font-medium mb-2">
              اسم القسم
            </label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <select
                  id="department"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  {...field}
                >
                  <option value="">اختر...</option>
                  {depNames?.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              )}
            />
            {errors.department && (
              <span className="text-red-500 text-[16px]">
                {errors.department.message}
              </span>
            )}
          </div>

  
          <div className="mb-1">
            <label htmlFor="user" className="block font-medium mb-2">
              اسم المستخدم
            </label>
            <Controller
              name="user"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="user"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل اسم المستخدم"
                  {...field}
                />
              )}
            />
            {errors.user && (
              <span className="text-red-500 text-[16px]">
                {errors.user.message}
              </span>
            )}
          </div>

          <div className="col-span-2 flex justify-between items-center">
            <Button
              type="submit"
              label={"إضافة"}
              className={`w-[70px]`}
              disabled={!isFormValid}
            />
            <Button
              label={"إلغاء"}
              onClick={() => {
                control._reset();
                setIsOpen(false);
              }}
              className={`w-[70px] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}