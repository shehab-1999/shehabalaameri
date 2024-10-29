import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";


export const useGetPatient =() => {
  return useQuery({
    queryKey: ["patient"],
    queryFn:async()=>{
      return await fetchPatient();
    }
  });
};

const fetchPatient = async (): Promise<any> => {
  const response = await apifetch.get(`getPatient`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};

