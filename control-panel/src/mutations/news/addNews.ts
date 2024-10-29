import { apifetch } from "@/api";
import { addNewsType, News } from "@/app/types/types";
import axios from "axios";

export const AddNews= async (data: any) => {
  try {
    const response = await apifetch.post(`add_news`, data);

    if (response.status !== 201) {
      throw new Error("Error adding News: " + response.data.message);
    }

    return response.data;
  } catch (error: any) {
    if (error && axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    console.error("Error adding News:", error);
    throw error; // Re-throw for handling in your component
  }
};
