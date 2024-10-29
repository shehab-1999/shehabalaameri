import { apifetch } from "@/api";
import axios from "axios";

export const deleteUser=async(id: string,token?:string)=>{

    try {
        const response=await apifetch.put(`/user`,{id:`${id}`})
  
    return response.data
    } catch (error) {
        if(error&&axios.isAxiosError(error)){
            throw new Error(error.response?.data.message)
        }
      
        throw error
    }
}