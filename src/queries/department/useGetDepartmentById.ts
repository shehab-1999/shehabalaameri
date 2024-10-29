import { apifetch } from "@/api";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { headers } from "next/headers";


export default function useGetDepartmentById (id:string,token?:any)  {
  return useQuery({
    queryKey: ["departments"],
    queryFn:async()=>{
      const response = await apifetch.get(`/Department/id?id=${id}`,);
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
    }
  });
};

const fetcDoctor = async (id:string): Promise<any> => {
  const response = await apifetch.get(`/Department/id?id=${id}`,{headers:{Authorization:`Bearer ${""}`}});
  if (!response.data) {
    throw new Error("Error");
  }
  return response.data
};
