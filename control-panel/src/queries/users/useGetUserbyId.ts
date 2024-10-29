import { apifetch } from "@/api";
import { User } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersbyId =(id:string) => {
  return useQuery({
    queryKey: ["user-id"],
    queryFn:async()=>{
      return await getUserbyId(id);
    }
  });
};

const getUserbyId = async (id:string): Promise<any> => {
  const response = await apifetch.get(`/getUserbyId/${id}`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
