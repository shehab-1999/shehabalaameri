"use client"

import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";
import axios from "axios";
import { headers } from "next/headers";

export const doctorDelete=async(id:string)=>{

    try {
        const response=await apifetch.put(`Doctor/id`,{id:`${id}`})
    if(response.status!==200){
        throw new Error(`خطأ في حذف الدكتور`+response.statusText)
    }
    return response.data 
    } catch (error) {
        if(error&&axios.isAxiosError(error))
        {
         throw new Error(error.response?.data.message)
        }
         throw error
     }
}