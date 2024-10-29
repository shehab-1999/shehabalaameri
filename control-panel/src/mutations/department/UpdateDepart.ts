import { apifetch } from "@/api";
import { Department } from "@/app/types/types";

export const updateDepartment=async(data:Department,id:string)=>{

    try {
        const response=await apifetch.put(`/update_depart/${id}`,data)
    if(response.status!==200){
        throw new Error("erorr updating "+response.statusText)
    }
    return response.data
    } catch (error:any) {
        console.error("erorr updating",error);
        throw error
    }
}