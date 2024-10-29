import { apifetch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { addNewsType, News } from "@/app/types/types";
import axios from "axios";


export const useGetNewsById =(id:any) => {
  return useQuery({
    queryKey: ["getnews-id"],
    queryFn:async()=>{
      return await  getNewsById(id);
    }
  });
};

const getNewsById = async (id: string): Promise<any> => {
  try {
    const response = await apifetch.get(`/get_news_byId/${id}`);
    if (!response.data) {
      throw new Error("Error");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw new Error(error.response?.data.message || "Unexpected error");
    }
    console.error("General error:", error);
    throw error;
  }
};