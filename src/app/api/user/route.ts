import db from "@/db/db";
import { hashSync} from "bcrypt";
import { JWT_SECRET } from "@/secret";

import { message } from "antd";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  
  const {email,userName,password,roleName,permissionPageDepartments,
    permissionPageDoctors,
    permissionPageNews,
    permissionPagePatients } = await request.json(); 
  

  // تحويل الجسم إلى JSON
  try {
    let users = await db.users.findFirst({
      where: { email: email as any },
    });

    if (users) {
      return NextResponse.json({ message: " الايميل مأخوذ مسبقا" },{status:401});
    }

    const user = await db.users.create({
      data: {
        email,
        userName,
        password: hashSync(password, 10),
        role: roleName,
      permissions:{connect:[{id:permissionPageDoctors},{id:permissionPageNews},{id:permissionPagePatients},{id:permissionPageDepartments}]}

      },
    });
    if(user){
      const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 24); // 24 hours from now
    
      const session = await db.session.create({
        data: {
          userId: user.id,
          expirationDate: expirationDate,
      
           
        },
      });
    return NextResponse.json(user);}
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json({ message: 'حدث خطأ أثناء معالجة الطلب' }, { status: 500 });
  }
}
export async function POSTT(request: Request) {
  const formatData = await request.formData();
  const email = formatData.get("email");
  const userName = formatData.get("userName");
  const password = formatData.get("password");
  const role = formatData.get("role");

  try {
  
    let users = await db.users.findFirst({
      where: { email: email as any },
    });

    if (users) {
      return NextResponse.json({ message: " الايميل مأخوذ مسبقا" });
    }

    const user = await db.users.create({
      data: {
        email: email as any,
        userName: userName as string,
        password: hashSync(password as any, 10),
        role: role as any,
        // permissions:{connect:permissionId.map((perId:string)=>({id:perId}))}
      },
    });
    
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24); // 24 hours from now
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: "1h" })
    const session = await db.session.create({
      data: {token,
        userId: user.id,
        expirationDate: expirationDate,
    
         
      },
    });
    // إنشاء جلسة للمستخدم

    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ message: "erro" }, { status: 500 });
  }
}
export async function GET() {
  try {
    
    const users = await db.users.findMany({
      where: { isDeleted:false },include:{permissions:true}
    });
    if(users)
    return NextResponse.json(users);
  } catch (error) {
  return  NextResponse.json(
      { message: "خطأ في جلب بيانات  المستخدمين" },
      { status: 500 }
    );
  }
}

export async function PUT(request:Request) {
  const {id}=await request.json()

  try {
    const users = await db.users.update({
      where: { id:id},data:{
        isDeleted:true
      }
    });
    return NextResponse.json(users);
  } catch (error) {
  return  NextResponse.json(
      { message: "خطأ في جلب بيانات  المستخدمين" },
      { status: 500 }
    );
  }
}
