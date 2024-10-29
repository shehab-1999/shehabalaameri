import db from "@/db/db";
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
    
        const getAppointement = await db.oppontement.findMany({
          where: {
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
          include: {
            patient: { select: { patName: true } },
            doctor: { select: { doctorName: true } },
          },
        });
          return  NextResponse.json(getAppointement);
      } catch (error) {
      return  NextResponse.json({ message: 'خطأ في جلب الحجوزات اليومية',},{status:500});
      }
}


