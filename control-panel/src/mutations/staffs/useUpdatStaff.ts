import { apifetch } from "@/api";
import { Staff } from "@/components/types/types";
export const useUpdateStaff=async(data:Staff)=>{

try {
    const response=await apifetch.put("/update_staff",data)
    if(response.status!==200){

        throw new Error("error adding staff"+response.statusText)
    }
} catch (error) {
    console.error("error adding staff",error)
    throw error
    
}

}