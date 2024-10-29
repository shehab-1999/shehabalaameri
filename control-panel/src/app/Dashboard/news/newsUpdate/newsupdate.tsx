"use client";

import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { addNewsType, News, newsType, newsZodSchema } from "@/app/types/types"; // تأكد من استيراد الزود
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNews } from "@/mutations/news/addNews";
import { UpdateNews } from "@/mutations/news/updateNews";
import { useGetNews } from "@/queries/news/useGetNews";
import { useGetNewsById } from "@/queries/news/useGetnewsById";

interface newsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
  id: string;
}

export default function NewsUpdate({
  isOpen,
  setIsOpen,
  id,
  refetch,
}: newsProps): React.JSX.Element {
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      headline: "",
      title: "",
      img: null, // يجب أن تكون null هنا
      user: "",
      department: "",
    },
    resolver: zodResolver(newsZodSchema),
  });
  const { data: newsdata, isLoading } = useGetNewsById(id as string);

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (newsdata) {
      setValue("headline", newsdata.headline || "");
      setValue("title", newsdata.title || "");
      setCurrentImage(newsdata.img || "");
      setValue("user", newsdata.user.userName || "");
      setValue("department", newsdata.department.depName || "");
    }
  }, [newsdata]);

  const mutation = useMutation({
    mutationKey: ["news-update"],
    mutationFn: (data: any) => UpdateNews(data, id as string),
    onError: (err) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },

    onSuccess: () => {
      message.success("تم تحديث الاخبار بنجاح");
      refetch();
      setIsOpen(false);
    },
  });
  const [isFormValid, setIsFormValid] =React.useState(false);
  useEffect(()=>{
    setIsFormValid(isValid&&Object.keys(errors).length==0)
  
  },[isValid,errors]);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("headline", data.headline);
    formData.append("title", data.title);
    formData.append("img", data.img || null);
    formData.append("userName", data.user);
    formData.append("depName", data.department);

    mutation.mutate(formData);
  };

  return (
    <div dir="rtl">
      <Modal open={isOpen} closeIcon={false} footer={null}>
        {isLoading ? <div>loading...</div> : ""}
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          تعديل الاخبار
        </h2>
        <form
          encType="multipart/form-data"
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
        >
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
                  className="w-full border border-gray-300 rounded-md py-2 h-[250px] px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
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
              الصورة
            </label>
            {currentImage && (
              <div>
                <img
                  src={`http://localhost:8081/images/${currentImage}`}
                  alt="Current"
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
            )}
            <Controller
              name="img"
              control={control}
              render={({ field: { onChange, ref } }) => (
                <input
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
                  <option value="heart">القلب</option>
                  <option value="earn">أذن</option>
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
              onClick={handleSubmit(onSubmit)}
              label={"تحديث"}
              className={`w-[70px]`}
              disabled={!isFormValid}
            />
            <Button
              label={"إلغاء"}
              onClick={() => {
                setIsOpen(false);
                control._reset();
              }}
              className={`w-[70px] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
