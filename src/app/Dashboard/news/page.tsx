"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { useGetNews } from "@/queries/news/useGetNews";
import NewsAdd from "./newsAdd";
import { formatDate, formatDateTime } from "@/app/util/dateFormat";

import NewsUpdate from "./newsupdate";
import DangerDialog from "@/app/components/ui/danger-dialog";
import ToastContainer from "@/app/components/ui/toastCobtainer";
import { useMutation } from "@tanstack/react-query";
import { deleteNews } from "@/mutations/news/deleteNews";

import Card from "../card/page";
import { useSession } from "next-auth/react";
interface Permission {
  page: string;
  id: string;
  actions: string;
}
export default function NewsTable() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = React.useState(false);
  const [newsId, setNewsId] = React.useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [deletenewsId, setdeletenewsId] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: news, isLoading, error, refetch } = useGetNews();
  const [filterNews, setFilterNews] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  const {data:session}=useSession()

  const pageName = "News";
  const permissions = (
    session?.user as { permissions?: Permission[] }
  )?.permissions?.find((permission) => permission.page === pageName)?.actions;
  const mutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteNews,
    onSuccess() {
      setSuccess("delete successfully");
      refetch();
    },
    onError(error: any) {
      setError(error);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
    setOpenDialog(false);
  };
  const Close = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    if (news) {
      setFilterNews(news?.map((newss: any) => ({ ...newss })));
    }
  }, [news]);
  const filteredNews = filterNews.filter((newss) =>
    newss.headline?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  if (isLoading) return <p>جاري جلب البيانات...</p>;
  if (error) return <p>خطأ في جلب البيانات.</p>;

  return (
    <>
    {!permissions?.includes('إخفاء الصفحة')&& <div className="w-[100%] font-serif overflow-x-auto ">
      <div className="flex flex-row gap-3 mt-2">
        <Button
          disabled={!permissions?.includes("إضافة")}
          onClick={() => setIsModalOpen(true)}
          className={`mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1`}
        >
          <img src="/plus.png" width={20} height={20} alt="plus" />
        </Button>
        <NewsAdd
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          refetch={refetch}
        />
        {isModalOpenUpdate && (
          <NewsUpdate
            newsdata={newsId}
            isOpen={isModalOpenUpdate}
            refetch={refetch}
            setIsOpen={setIsModalOpenUpdate}
          />
        )}
        <input
          type="text"
          placeholder="بحث عن الأخبار..."
          className="mb-4 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto"  style={{height:`${window.innerHeight - window.innerHeight / 5}px` ,direction:"ltr"}} >
      <Card
        height={`${window.screen.height - window.screen.height / 5}px`}
       
        type="Table"
        // eslint-disable-next-line react/no-children-prop
        children={
          <div
          
        className="mt-2 mb-2   min-w-full  border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl  "
        style={{ direction: "rtl" }}
      >
        <table className="divide-y w-[100%] overflow-x-auto">
          <thead className="bg-[#91A1B6] sticky top-4 z-[99] max-sm:hidden ">
            <tr>
              <th className={`px-1 py-3 text-white  rounded-tr-[20px]`}>
                الموضوع
              </th>

              <th className={`px-1 py-3 text-white `}>المحتوى</th>

              <th className={`px-1 py-3 text-white `}>الصورة</th>
              <th className={`px-1 py-3 text-white `}>المستخدم</th>
              <th className={`px-1 py-3 text-white `}>القسم</th>
              <th className={`px-1 py-3 text-white `}>تاريخ النشر</th>
              <th className={`px-1 py-3 text-white  rounded-tl-[20px]`}>
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-[3px] ">
            {filteredNews?.map((news, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 max-sm:grid max-sm:grid-flow-row"
              >
                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold">الموضوع </h1>{" "}
                  {news.headline}
                </td>
                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold">المحتوى</h1>
                  {news.title}
                </td>

                <td
                  className={`px-3 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-50 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold">الصوره</h1>{" "}
                  {news.img!==null&&
                    <img
                      height={50}
                      width={50}
                      src={`/images/${news?.img}`}
                      className="rounded-full"
                      alt="Doctor"
                    />
                  }
                    {news.img==null && "لاتوجد صوره"}
                </td>

                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold">المستخدم</h1>{" "}
                  {news?.user?.userName}
                </td>

                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold">القسم</h1>{" "}
                  {news?.department?.depName}
                </td>

                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold">تاريخ النشر</h1>{" "}
                  {formatDateTime(news?.createdAt)}
                </td>

                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col`}
                >
                  <div className="flex justify-center gap-3">
                    <Button
                      disabled={!permissions?.includes("تعديل")}
                      onClick={() => {
                        setIsModalOpenUpdate(true);
                        setNewsId(news);
                      }}
                    >
                      تعديل
                    </Button>

                    <Button
                     disabled={!permissions?.includes("حذف")}
                      className=" bg-red-700"
                      onClick={() => {
                        setdeletenewsId(news.id as string);
                        setOpenDialog(true);
                      }}
                    >
                      حذف
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          
        }
      
        header=""
      ></Card>
      
      </div>
      <DangerDialog
        content="هل تريد حذف الاخبار حقاً؟"
        onClose={Close}
        onConfirm={() => handleDelete(deletenewsId)}
        open={openDialog}
        title="حذف اخبار"
      />
      <ToastContainer message={Error} type={"error"} />
      <ToastContainer message={success} type={"success"} />
    </div>}
    {permissions?.includes('إخفاء الصفحة') && "غير مخول لدخول هذه الصفحة"}
    </>
   
  );
}
