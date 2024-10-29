"use client"

import { apifetch } from "@/api";
import { Doctor } from "@/app/types/types";

export const doctorDelete=async(id:string)=>{

    try {
        const response=await apifetch.delete(`/deleteDoctor/${id}`)
    if(response.status!==200){
        throw new Error(`error deleting doctor`+response.statusText)
    }
    return response.data
    } catch (error) {
        console.error(`error deleting doctor`,error);
        throw error
    }
}