import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import axios from "axios";
export const doctroUpdate=async(data:any,id:string )=>{
    try {
      
        //const response=await apifetch.put(`/updateDoctor/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        const response = await apifetch.put(`/Doctor?id=${id}`,data);
   
        if(response.status!==200){

            throw new Error("error updating"+response.statusText)
        }
        return response
    } catch (error) {
        if(error&&axios.isAxiosError(error))
        {
         throw new Error(error.response?.data.message)
        }
         throw error
     }

}