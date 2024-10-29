import { useQuery } from "@tanstack/react-query";

import { apifetch } from "@/api";
import { Oppontement } from "@/app/types/types";

export const useGetAllOpponInToday =() => {
  return useQuery({
    queryKey: ["oppointment"],
    queryFn:async()=>{
      const response = await apifetch.get(`/appointment`);
  
      if (!response.data) {
        throw new Error("Error");
      }
      return response.data
    }
  });
};

const getAllOppon = async (): Promise<Oppontement[]> => {
  const response = await apifetch.get(`/appointment`);
  
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
