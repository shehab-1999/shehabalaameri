import db from "@/db/db";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(){

try {
    const today = new Date() // Get the current date in YYYY-MM-DD format

    const startDate =new Date(

      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
    const endDate = new Date(startDate.getTime() +24 * 60 * 60 * 1000-1);

    


    const getOppontement = await db.oppontement.findMany({
        where:{isDeleted:false,patient:{isDeleted:false},},
    select: { doctor: {select:{doctorName:true,department:{select:{depName:true}}}, }, patient:true,date:true },
      });



      return NextResponse.json(getOppontement)
} catch (error) {
    return NextResponse.json({message:"خطأ في عملية الجلب"},{status:500})
}

}



export async function POST(){

try {
    const today = new Date() // Get the current date in YYYY-MM-DD format

    const startDate =new Date(

      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
    const endDate = new Date(startDate.getTime() +24 * 60 * 60 * 1000-1);

    


    const getOppontement = await db.oppontement.findMany({
        where:{isDeleted:false,patient:{isDeleted:false},},
    select: { doctor: {select:{doctorName:true,department:{select:{depName:true}}}, }, patient:true,date:true },
      });



      return NextResponse.json(getOppontement)
} catch (error) {
    return NextResponse.json({message:"خطأ في عملية الجلب"},{status:500})
}

}