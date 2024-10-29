import { apifetch } from "@/api";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useGetDepartmentById (id:string)  {
  return useQuery({
    queryKey: ["departments"],
    queryFn:async()=>{
      return await fetcDoctor(id);
    }
  });
};

const fetcDoctor = async (id:string): Promise<any> => {
  const response = await apifetch.get(`getDepartmentById/${id}`);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
