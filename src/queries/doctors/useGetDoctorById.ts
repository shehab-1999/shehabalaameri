import { apifetch } from "@/api";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetDoctorById(id: string,token?:string) {
  return useQuery({
    queryKey: [`getDoctorById`],
    queryFn: async () => {
      const response = await apifetch.get(`/Doctor/id?id=${id}`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data;
    },
  });
}

const fetcDoctor = async (id: string,token:string): Promise<any> => {
  const response = await apifetch.get(`/Doctor/id?id=${id}`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data;
};
