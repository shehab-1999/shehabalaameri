import { apifetch } from "@/api";
import axios from "axios";

export const deleteUser=async(id: string)=>{

    try {
        const response=await apifetch.delete(`/deleteUser/${id}`)
    if(response.status!==200){
        throw new Error("error delete User"+response.statusText)
    }
    return response.data
    } catch (error) {
        if(error&&axios.isAxiosError(error)){
            throw new Error(error.response?.data.message)
        }
      
        throw error
    }
}