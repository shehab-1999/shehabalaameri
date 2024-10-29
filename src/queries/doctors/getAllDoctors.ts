import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useGetDoctor =() => {
  return useQuery({
    queryKey: ["doctor"],
    queryFn:async()=>{
      const response = await apifetch.get(`/Doctor`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
     
    }
  });
};


