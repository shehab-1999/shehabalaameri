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
import { hashPermision } from "@/app/permision/hashpermision";

export default function UserTable() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deletenewsId, setdeletenewsId] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: user, isLoading, error, refetch } = useGetUsers();
  const [filterUsers, setFilterUsers] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const mutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
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
    const isAdmin = hashPermision("admin");
    setIsAdmin(isAdmin);
    if (user) {
      setFilterUsers(user?.map((user) => ({ ...user })));
    }
  }, [user]);
console.log(isAdmin)
  const filteredUsers = filterUsers.filter((user) =>
    user.userName?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading news.</p>;
  const width =( window.innerWidth / 2) / 5;
  return (
    <div className="w-[100%] font-serif">
      <div className="flex flex-row gap-3 mt-2">
        <Button
          disabled={!isAdmin}
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
            id={userId}
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
      <div className="mt-2 mb-2 min-w-full overflow-y-auto h-[600px]">
        <table className="divide-y w-[100%]">
          <thead className="bg-[#91A1B6]">
            <tr>
              <th
                className={`px-6 py-3 text-white w-[${width}px] rounded-tr-[20px]`}
              >
                اسم المستخدم
              </th>

              <th className={`px-6 py-3 text-white w-[${width}px]`}>
                البريد الالكتروني
              </th>

              <th className={`px-6 py-3 text-white w-[${width}px]`}>
                كلمة المرور
              </th>
              <th className={`px-6 py-3 text-white w-[${width}px]`}>الدور</th>
              <th
                className={`px-6 py-3 text-white w-[${width}px] rounded-tl-[20px]`}
              >
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-[3px]">
            {filteredUsers?.map((users) => (
              <tr key={users.id} className="hover:bg-gray-100">
                <td
                  className={`px-6 py-2 text-center bg-white w-[${width}px] text-balance`}
                >
                  {users.userName}
                </td>
                <td
                  className={`px-6 py-2 text-center bg-white w-[${width}px] text-balance `}
                >
                  {users.email}
                </td>

                <td
                  className={`px-6 py-2 text-center bg-white w-[${width}px] text-balance`}
                >
                  {"***************"}
                </td>
                <td
                  className={`px-6 py-2 text-center bg-white w-[${width}px] text-balance`}
                >
                  {users.role}
                </td>
                <td
                  className={`px-6 py-2 text-center bg-white w-[${width}px] text-balance`}
                >
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => {
                        setUserId(users.id as string);
                        setIsModalOpenUpdate(true);
                      }}
                      disabled={!isAdmin}
                    >
                      تعديل
                    </Button>

                    <Button
                      className=" bg-red-700"
                      onClick={() => {
                        setdeletenewsId(users.id as string);
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
        content="هل تريد حذف المستخدم حقاً؟"
        onClose={Close}
        onConfirm={() => handleDelete(deletenewsId)}
        open={openDialog}
        title="حذف مستخدم"
      />
      <ToastContainer message={Error} type={"error"} />
      <ToastContainer message={success} type={"success"} />
    </div>
  );
}
