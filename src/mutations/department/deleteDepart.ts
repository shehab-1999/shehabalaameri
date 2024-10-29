import { apifetch } from "@/api";
import axios from "axios";
import { headers } from "next/headers";
export const departmentDelete=async(id:string,token?:string)=>{
//const response=await apifetch.put(`/deleteDepartment/${id}`,"",{headers:{Authorization:`Bearer ${token}`}})
try {
    const response = await apifetch.put(`/Department/id`,{id:id});
    if(response.status!==200){
        throw new Error("error deleting"+response.statusText)
    }
    return response.data
}catch (error) {
    if(error&&axios.isAxiosError(error))
    {
     throw new Error(error.response?.data.message)
    }
     throw error
 }


}