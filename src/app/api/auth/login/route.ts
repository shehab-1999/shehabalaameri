import db from "@/db/db";
import { JWT_SECRET } from "@/secret";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { NextResponse } from "next/server";
import { message } from "antd";


export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        let user = await db.users.findFirst({
            where: { email },
        });

        if (!user) {
            // إرجاع استجابة "غير موجود" إذا لم يكن المستخدم موجودًا
            return NextResponse.json({ message: "هذا الحساب غير موجود" }, { status: 404 });
        }

        if (!compareSync(password, user.password as string)) {
            // إرجاع استجابة "خطأ في كلمة السر" إذا كانت كلمة المرور غير صحيحة
            return NextResponse.json({ message: "خطأ في كلمة السر أو في الإيميل" }, { status: 401 });
        }
        const response = NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                userName: user.userName,
                role: user.role,
            },
         
        });

      
        return response; // إرجاع الاستجابة النهائية
    } catch (error) {
        // معالجة الأخطاء
        return NextResponse.json({ message: "حدث خطأ غير متوقع" }, { status: 500 });
    }
}
export async function GET(request:Request) {
  
   const email =  request.headers.get('authorization')?.split(" ")[1];

    
    
    try {
   

      const user = await db.users.findMany({
        where: { email  },
        select:{email:true,password:true,role:true,permissions:true}
      });
     
    
     
      if(user.length==0){
       
        return NextResponse.json(0)
      }
      return NextResponse.json(user);
    } catch (error) {
     
     return NextResponse.json({message:"forbidden"},{status:500});
    }
  }