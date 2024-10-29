import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetPatient =() => {
  return useQuery({
    queryKey: ["patient"],
    queryFn:async()=>{
      const response = await apifetch.post(`/patient`);
      if (!response.data) {
        throw new Error("Error");
      }
      return response.data
    }
  });
};

const fetchPatient = async (): Promise<any> => {
 
};

