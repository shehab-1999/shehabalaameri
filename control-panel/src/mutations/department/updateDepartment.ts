import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
export const departmentUpdate=async(data:any,id:string)=>{
    try {
        const response=await apifetch.put(`updateDepartment/${id}`,data)
    if(response.status!==200){

        throw new Error("error updating"+response.statusText)
    }
    return response
    } catch (error) {
        console.error("erorr updating doctro",error);
        throw error
    }

}