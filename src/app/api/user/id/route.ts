import db from "@/db/db";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
  
    const { searchParams } = new URL(request.url);
    
    const id = searchParams.get('id');
    try {
      const users = await db.users.findMany({
        where: { isDeleted: false,id:id as string },include:{permissions:true}
      });
      return NextResponse.json(users);
    } catch (error) {
      NextResponse.json(
        { message: "خطأ في جلب بيانات  المستخدمين" },
        { status: 500 }
      );
    }
  }
  export async function PUT(request:Request) {

    const {email,password,userName,roleName,permissionPageDepartments,
      permissionPageDoctors,
      permissionPageNews,
      permissionPagePatients}=await request.json()
    const { searchParams } = new URL(request.url);
  const id=searchParams.get('id')
    try {
      if(password==""){
        const users = await db.users.update({
          where: { id:id as string},data:{
            email,userName,role:roleName,permissions:{set:[{id:permissionPageDoctors},{id:permissionPageNews},{id:permissionPagePatients},{id:permissionPageDepartments}]}
          
          }
        });
        return NextResponse.json(users);
      }
      const users = await db.users.update({
        where: { id:id as string},data:{
          email,userName,role:roleName,
          password: hashSync(password as any, 10),
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
  