import { apifetch } from "@/api";
import { Staff } from "@/app/types/types";
export const useAddStaff=async(data:Staff)=>{

try {
    const response=await apifetch.post("/add_staff",data)
    if(response.status!==200){

        throw new Error("error adding staff"+response.statusText)
    }
} catch (error) {
    console.error("error adding staff",error)
    throw error
    
}

}