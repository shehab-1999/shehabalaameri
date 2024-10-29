import db from "@/db/db";
import { message } from "antd";
import { request } from "http";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
 
  const { searchParams } = new URL(request.url);
  
  const id = searchParams.get('id');  // استخراج المعرف من جسم الطلب

    try {
        const news = await db.news.findUnique({
            where:{id:id as any },
           include:{department:true,user:true}
          });
      if (news==null) {
        return NextResponse.json({ message: 'القسم غير موجود' }, { status: 404 }); // إرجاع 404 إذا لم يتم العثور على الأقسام
      }
      return NextResponse.json(news)
    } catch (error) {
      console.error(error); // طباعة الخطأ في السجل
      return NextResponse.json({ message: 'خطأ في البيانات' }, { status: 500 }); // إرجاع 500 في حالة وجود خطأ
    }
  } 
  export async function PUT(request: Request) {
   
   const {id}=await request.json() // استخراج المعرف من جسم الطلب

      try {
        const softDeleteNews= await db.news.update({
          where: {id:id as any},
          data: { isDeleted: true },
        });
    
        if (softDeleteNews) {
          return NextResponse.json({message:`تم حذف الدكتور`},{status:200});
        } 
      } catch (error) {
        console.error(error); // طباعة الخطأ في السجل
        return NextResponse.json({ message: 'خطأ في حذف الخبر' ,error}, { status: 500 }); // إرجاع 500 في حالة وجود خطأ
      }
    } 
  

