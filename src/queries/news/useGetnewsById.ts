import { apifetch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { addNewsType, News } from "@/app/types/types";
import axios from "axios";


export const useGetNewsById =(id:any) => {
  return useQuery({
    queryKey: ["getnews-id"],
    queryFn:async()=>{
      try {
        const response = await apifetch.get(`/News/id?id=${id}`);
        if (!response.data) {
          throw new Error("Error");
        }
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
        
          throw new Error(error.response?.data.message || "Unexpected error");
        }
       
        throw error;
      }
    }
  });
};

const getNewsById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/News/id?id=${id}`,{headers:{Authorization:`Bearer ${"token"}`}});
    if (!response.data) {
      throw new Error("Error");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    
      throw new Error(error.response?.data.message || "Unexpected error");
    }
   
    throw error;
  }
};