"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { useGetNews } from "@/queries/news/useGetNews";
import NewsAdd from "../newsAdd/newsAdd";
import { formatDate, formatDateTime } from "@/app/util/dateFormat";
import { UpdateNews } from "@/mutations/news/updateNews";
import NewsUpdate from "../newsUpdate/newsupdate";
import DangerDialog from "@/app/components/ui/danger-dialog";
import ToastContainer from "@/app/components/ui/toastCobtainer";
import { useMutation } from "@tanstack/react-query";
import { deleteNews } from "@/mutations/news/deleteNews";

export default function NewsTable() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deletenewsId, setdeletenewsId] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: news, isLoading, error, refetch } = useGetNews();
  const [filterNews, setFilterNews] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      setFilterNews(news?.map((newss) => ({ ...newss })));
    }
  }, [news]);
  const filteredNews = filterNews.filter(
    (newss) =>
      newss.headline?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading news.</p>;
  const width = window.innerWidth / 2 / 7;
  return (
    <div className="w-[100%] font-serif">
      <div className="flex flex-row gap-3 mt-2">
        <Button
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
            id={newsId}
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
      <div className="mt-2 mb-2 min-w-full">
        <table className="divide-y w-[100%]">
          <thead className="bg-[#91A1B6]">
            <tr>
              <th
                className={`px-6 py-3 text-white w-[${width}px] rounded-tr-[20px]`}
              >
                الموضوع
              </th>
              <th className={`px-6 py-3 text-white w-[${width}px]`}>المحتوى</th>
              <th className={`px-6 py-3 text-white w-[${width}px]`}>الصورة</th>
              <th className={`px-6 py-3 text-white w-[${width}px]`}>
                المستخدم
              </th>
              <th className={`px-6 py-3 text-white w-[${width}px]`}>القسم</th>
              <th className={`px-6 py-3 text-white w-[${width}px]`}>
                تاريخ النشر
              </th>

              <th
                className={`px-6 py-3 text-white w-[${width}px] rounded-tl-[20px]`}
              >
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-[3px]">
            {filteredNews?.map((newsItem) => (
              <tr key={newsItem.id} className="hover:bg-gray-100">
                <td
                  className={`px-6 py-4 text-center bg-white w-[${width}px] text-balance`}
                >
                  {newsItem.headline}
                </td>
                <td
                  className={`px-6 py-4 text-center bg-white w-[${width}px] text-balance `}
                >
                  {newsItem.title}
                </td>
                <td
                  className={`px-6 py-4 text-center bg-white w-[${width}px] text-balance`}
                >
                  {newsItem.img??"لا توجد صورة"}
                </td>
                <td
                  className={`px-6 py-4 text-center bg-white w-[${width}px] text-balance`}
                >
                  {newsItem?.user?.userName}
                </td>
                <td
                  className={`px-6 py-4 text-center bg-white w-[${width}px] text-balance`}
                >
                  {newsItem.department.depName}
                </td>
                <td
                  className={`px-6 py-4 text-center bg-white w-[${width}px] text-balance font-sans`}
                >
                  {formatDateTime(newsItem.createdAt)}
                </td>
                <td
                  className={`px-6 py-4 text-center bg-white w-[${width}px] text-balance`}
                >
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => {
                        setIsModalOpenUpdate(true);
                        setNewsId(newsItem.id as string);
                      }}
                    >
                      تعديل
                    </Button>

                    <Button
                      className=" bg-red-700"
                      onClick={() => {
                        setdeletenewsId(newsItem.id as string);
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
      <DangerDialog
        content="هل تريد حذف الاخبار حقاً؟"
        onClose={Close}
        onConfirm={() => handleDelete(deletenewsId)}
        open={openDialog}
        title="حذف اخبار"
      />
      <ToastContainer message={Error} type={"error"} />
      <ToastContainer message={success} type={"success"} />
    </div>
  );
}
