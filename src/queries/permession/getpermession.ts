import { apifetch } from "@/api";
import { Department } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const useGetPermession =() => {
  return useQuery({
    queryKey: ["permession"],
    queryFn:async()=>{
      const response = await apifetch.get(`permession`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
    }
  });
};

const getDepartment = async (): Promise<Department[]> => {
  const response = await apifetch.get(`permession`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
