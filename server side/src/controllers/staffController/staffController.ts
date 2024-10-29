import { Request,Response,NextFunction } from "express";
import { prisma } from "../..";
export const addStaff=async(req:Request,res:Response,next:NextFunction)=>{
    const {name,phone,id_department}=req.body
    try {
        const staff=await prisma.staff.create({
            data:{staffName:name,phone:phone,department:{connect:{id:id_department}}},include:{department:{select:{depName:true}}}
        })
        res.json(staff)
    } catch (error) {
        res.json(error)
    }
}
export const updateSttff=async(req:Request,res:Response,next:NextFunction)=>{
    const {name,phone,id_department}=req.body
    const {id}=req.params
    try {
        const staff=await prisma.staff.update({where:{id:id},
            data:{staffName:name,phone:phone,department:{connect:{id:id_department}}},include:{department:{select:{depName:true}}}
        })
        res.json(staff)
    } catch (error) {
        res.json(error)
    }
}

export const get_Staff_ById=async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params
    try {
        const staff=await prisma.staff.findFirst({
            where:{id:id},include:{department:{select:{depName:true}}}
        })
        
    } catch (error) {
        res.json(error)
    }
}
export const get_All_Staff=async(req:Request,res:Response,next:NextFunction)=>{
    
    try {
        const staff=await prisma.staff.findMany({
            include:{department:{select:{depName:true}}}
        })
        
    } catch (error) {
        res.json(error)
    }
}
export const delete_Staff_ById=async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params
    try {
        const staff=await prisma.staff.delete({
            where:{id:id},include:{department:{select:{depName:true}}}
        })
        
    } catch (error) {
        res.json(error)
    }
}
export const delete_Staff=async(req:Request,res:Response,next:NextFunction)=>{
   
    try {
        const staff=await prisma.staff.deleteMany()
        
    } catch (error) {
        res.json(error)
    }
}