import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import axios from "axios";
export const departmentUpdate=async(data:any,id:string,token?:string)=>{
    try {
      //  const response=await apifetch.put(`updateDepartment/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
      const response = await apifetch.put(`/Department?id=${id}`,data);
    if(response.status!==200){

        throw new Error("error updating"+response.statusText)
    }
    
    } catch (error) {
        if(error&&axios.isAxiosError(error))
        {
         throw new Error(error.response?.data.message)
        }
         throw error
     }

}