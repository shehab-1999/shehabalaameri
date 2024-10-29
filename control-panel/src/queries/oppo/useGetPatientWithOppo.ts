import { useQuery } from "@tanstack/react-query";
import {  Oppontement } from "@/components/types/types";
import { apifetch } from "@/api";

export const useGetAllPatientsWithOppon =() => {
  return useQuery({
    queryKey: ["patient"],
    queryFn:async()=>{
      return await getAllPatientWithOppon();
    }
  });
};

const getAllPatientWithOppon = async (): Promise<Oppontement[]> => {
  const response = await apifetch.get(`get_patient`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
