import { apifetch } from "@/api";
export const departmentDelete=async(id:string)=>{
const response=await apifetch.delete(`/deleteDepartment/${id}`)
try {
    if(response.status!==200){
        throw new Error("error deleting"+response.statusText)
    }
    return response.data
} catch (error) {
    console.error("erorr deleting ",error);
    throw error
}


}