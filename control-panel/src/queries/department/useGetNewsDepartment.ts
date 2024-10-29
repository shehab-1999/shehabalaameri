import { apifetch } from "@/api";
import { Department } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";



export const useGetDepartmentsNews =() => {
  return useQuery({
    queryKey: ["department"],
    queryFn:async()=>{
      return await getDepartmentNews();
    }
  });
};

const getDepartmentNews = async (): Promise<Department[]> => {
  const response = await apifetch.get(`getnews_depart`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
