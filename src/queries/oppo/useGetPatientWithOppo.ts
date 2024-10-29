import { useQuery } from "@tanstack/react-query";

import { apifetch } from "@/api";
import { Oppontement } from "@/app/types/types";

export const useGetAllPatientsWithOppon =() => {
  return useQuery({
    queryKey: ["patient"],
    queryFn:async()=>{
      const response = await apifetch.get(`/patient`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
    }
  });
};

const getAllPatientWithOppon = async (): Promise<Oppontement[]> => {
  const response = await apifetch.get(`/patient`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
