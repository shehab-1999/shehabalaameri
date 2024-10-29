import { useQuery } from "@tanstack/react-query";
import {  Oppontement, Patient } from "@/components/types/types";
import { apifetch } from "@/api";

export const useGetAllOpponInToday =() => {
  return useQuery({
    queryKey: ["oppointment"],
    queryFn:async()=>{
      return await getAllOppon();
    }
  });
};

const getAllOppon = async (): Promise<Oppontement[]> => {
  const response = await apifetch.get(`get_Oppont`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
