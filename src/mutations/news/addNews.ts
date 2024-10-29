import { apifetch } from "@/api";
import { News } from "@/app/types/types";
import axios from "axios";

export const AddNews= async (data: any) => {
  try {
    const response = await apifetch.post(`/News`, data);

    if (response.status !== 200) {
      throw new Error("Error adding News: " + response.data.message);
    }

   
  } catch (error: any) {
    if(error&&axios.isAxiosError(error))
      {
       throw new Error(error.response?.data.message)
      }
       throw error
   }
};
