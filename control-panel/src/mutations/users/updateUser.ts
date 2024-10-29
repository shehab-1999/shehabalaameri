import { apifetch } from "@/api";
import { UpdateUser, User } from "@/app/types/types";
import axios from "axios";
export const updateUser=async(data:any,id:string)=>{

try {
    const response=await apifetch.put(`/updateUser/${id}`,data)
    if(response.status!==200){

        throw new Error("error update user"+response.statusText)
    }
} catch (error) {
   if(axios.isAxiosError(error)&&error)
   {
    throw new Error(error.response?.data.message)
   }
    throw error
    
}

}