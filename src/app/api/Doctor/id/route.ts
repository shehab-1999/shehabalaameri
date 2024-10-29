import db from "@/db/db";
import { message } from "antd";
import { request } from "http";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const id = searchParams.get('id');// استخراج المعرف من جسم الطلب
console.log(id)
    try {
        const doctors = await db.doctor.findFirst({
            where:{id:id as any ,isDeleted:false},
            select: { 
              
             img:true,
              doctorName:true,
              specialist:true,
            
              department:{select:{depName:true}},
              phone:true,
              information:true,
              weekwork:{select:{startTime:true,endTime:true,day:true}},
              
             
            },
            
          })
      if (doctors!==null) {
        return NextResponse.json(doctors);
      } else {
        return NextResponse.json({ message: 'Department not found' }, { status: 404 }); // إرجاع 404 إذا لم يتم العثور على الأقسام
      }
    } catch (error) {
      console.error(error); // طباعة الخطأ في السجل
      return NextResponse.json({ message: 'Error fetching departments' }, { status: 500 }); // إرجاع 500 في حالة وجود خطأ
    }
  } 
  export async function PUT(request: Request) {
   
   const {id}=await request.json() // استخراج المعرف من جسم الطلب

      try {
        const softDeleteDoctor = await db.doctor.update({
          where: {id:id as any},
          data: { isDeleted: true },
        });
    
        if (softDeleteDoctor) {
          return NextResponse.json({message:`تم حذف الدكتور`},{status:200});
        } 
      } catch (error) {
        console.error(error); // طباعة الخطأ في السجل
        return NextResponse.json({ message: 'خطأ في حذف الدكتور' ,error}, { status: 500 }); // إرجاع 500 في حالة وجود خطأ
      }
    } 
  

