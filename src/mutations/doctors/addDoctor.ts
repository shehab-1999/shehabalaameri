import { apifetch } from "@/api";
import { Doctor, doctroType } from "@/app/types/types";
import axios from "axios";

export const doctorAdd = async (formatData: any) => {
  try {
    // Validate data (consider using a validation library)
    // if (!isValidDoctorData(data)) { // Replace `isValidDoctorData` with your validation logic
    //   throw new Error("Invalid doctor data");
    // }
 

   // const response = await apifetch.post(`addDoctor`, data,{headers:{Authorization:`Bearer ${token}`}});

   const response = await apifetch.post(`/Doctor`,formatData
);
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