import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";


export const useGetDoctor =() => {
  return useQuery({
    queryKey: ["doctor"],
    queryFn:async()=>{
      return await fetcDoctor();
    }
  });
};

const fetcDoctor = async (): Promise<any> => {
  const response = await apifetch.get(`getDoctor`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};

