import { apifetch } from "@/api";

export const deleteStaff=async(id:string)=>{

    try {
        const response=await apifetch.delete(`/delete_staff/${id}`)
    if(response.status!==200){
        throw new Error("error deleting doctor"+response.statusText)
    }
    return response.data
    } catch (error) {
        console.error("error deleting doctor",error);
        throw error
    }
}