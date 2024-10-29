"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGetUsers } from "@/queries/users/useGetUsers";
import Button from "@/app/components/ui/button";
import { deleteUser } from "@/mutations/users/deleteUser";
import DangerDialog from "@/app/components/ui/danger-dialog";
import ToastContainer from "@/app/components/ui/toastCobtainer";
import AddUser from "./addUser";
import UserUpdate from "./updateUser";

import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";

export default function UserTable() {
  const [cookies] = useCookies(["authToken"]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deletenewsId, setdeletenewsId] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: user, isLoading, error, refetch } = useGetUsers();
  const [filterUsers, setFilterUsers] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  const role = (session?.user as { role?: string })?.role;

  const mutation = useMutation({
    mutationKey: ["delete-user"],

    mutationFn: (id: string) => deleteUser(id, cookies.authToken),
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
    if (user) {
      setFilterUsers(user?.map((user: any) => ({ ...user })));
    }
  }, [user]);

  const filteredUsers = filterUsers.filter((user) =>
    user.userName?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  if (isLoading) return <p>جاري جلب بيانات المستخدمين...</p>;
  if (error) return <p>خطأ في جلب بيانات المستخدمين...</p>;

  return (
    <>
      {role !== "user" && (
        <div
          className="overflow-y-scroll font-serif  rounded-br-2xl rounded-bl-2xl"
          style={{
            height: `${window.screen.height - window.screen.height / 4}px`,
            direction: "ltr",
            scrollbarWidth: "none",
          }}
        >
          <DangerDialog
            content="هل تريد حذف المستخدم حقاً؟"
            onClose={Close}
            onConfirm={() => handleDelete(deletenewsId)}
            open={openDialog}
            title="حذف مستخدم"
          />
          <div
            className="flex flex-row gap-3 mt-2 sticky top-0 z-[1] bg-slate-200"
            style={{ direction: "rtl" }}
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              className={`mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1`}
            >
              <img src="/plus.png" width={20} height={20} alt="plus" />
            </Button>
            <AddUser
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              refetch={refetch}
            />
            {isModalOpenUpdate && (
              <UserUpdate
                userdata={userData}
                isOpen={isModalOpenUpdate}
                refetch={refetch}
                setIsOpen={setIsModalOpenUpdate}
              />
            )}
            <input
              type="text"
              placeholder="بحث عن المستخدمين..."
              className="mb-4 p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div
            className="mt-2 mb-2 min-w-full  border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl  "
            style={{ direction: "rtl" }}
          >
          <table className="divide-y w-full">
  <thead className="bg-[#91A1B6]  max-md:hidden table-header-group">
    <tr>
      {["اسم المستخدم", "البريد الالكتروني", "الدور", "الصلاحيات", "الإجراءات"].map((header, index) => (
        <th key={index} className={`px-1 py-3 text-white ${index === 0 ? 'rounded-tr-[20px]' : ''} ${index === 4 ? 'rounded-tl-[20px]' : ''}`}>
          {header}
        </th>
      ))}
    </tr>
  </thead>
  <tbody className="divide-y-[3px]">
    {filteredUsers?.map((user) => (
      <tr key={user.id} className="hover:bg-gray-100 max-md:grid max-md:grid-flow-row">
        {["userName", "email", "role"].map((field, index) => (
          <td key={index} className="px-1 py-4 text-center bg-white text-balance max-md:grid max-md:grid-flow-col max-md:justify-between max-md:px-10 max-md:border-gray-100 max-md:border-solid max-md:border-[3px]">
            <h1 className="md:hidden font-bold">{field === "userName" ? "اسم المستخدم" : field === "email" ? "البريد الالكتروني" : "الدور"}</h1>
            {user[field]}
          </td>
        ))}
        <td className="px-1 py-4 text-center bg-white text-balance max-md:grid max-md:grid-flow-col max-md:justify-between max-md:px-10 max-md:border-gray-100 max-md:border-solid max-md:border-[3px]">
          <h1 className="md:hidden font-bold">الصلاحيات</h1>
          <select className="font-bold">
            {user.permissions.map((permission:any, index:number) => (
              <option className="text-center text-green-700" key={index}>
               
               {permission.page==`Doctors`&&`صفحة الدكاترة:${permission.actions}`}
                              {permission.page==`News`&&`صفحة الأخبار:${permission.actions}`}
                              {permission.page==`Patients`&&`صفحة المرضى:${permission.actions}`}
                              {permission.page==`Departments`&&`صفحة الأقسام:${permission.actions}`}
                            
              </option>
            ))}
          </select>
        </td>
        <td className="px-1 py-4 text-center bg-white text-balance max-md:grid max-md:grid-flow-col">
          <div className="flex justify-center gap-3">
            <Button onClick={() => { setUserData(user); setIsModalOpenUpdate(true); }}>تعديل</Button>
            <Button disabled={user.email === session?.user?.email} className="bg-red-700" onClick={() => { setdeletenewsId(user.id); setOpenDialog(true); }}>حذف</Button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

          </div>

          <ToastContainer message={Error} type={"error"} />
          <ToastContainer message={success} type={"success"} />
        </div>
      )}

      {role === "user" && "غير مخول لدخول هذه الصفحة"}
    </>
  );
}
