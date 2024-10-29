
import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import db from "@/db/db";
import axios from "axios";

export const departmentAdd = async (data: any) => {

  try {
  
    const response = await apifetch.post(`Department`,data);

    if (response.status!==200) {
      throw new Error("Error adding doctor: " + response.statusText);
    }

    // Assuming response contains added doctor data
  } catch (error) {
    if(error&&axios.isAxiosError(error))
    {
     throw new Error(error.response?.data.message)
    }
     throw error
 }
};