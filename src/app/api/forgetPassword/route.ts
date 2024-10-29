import db from "@/db/db";
import { json } from "stream/consumers";
import nodemailer from 'nodemailer'
import { compileWelcomeTemplate } from "@/lib/mail";
import { NextResponse } from "next/server";
import { message } from "antd";
import  jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/secret";
export async function POST(request:Request){
const {email}=await request.json()
try {
    const findEamil=await db.users.findFirst({
        where:{email:email},select:{email:true,id:true}
      })
      if(findEamil){
        const token = jwt.sign(
          { userId: findEamil.id },
          JWT_SECRET,
          { expiresIn: "1h" }
      );
const user=  await db.users.update({where:{email},data:{
token
  }})
        const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
        
          const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: SMTP_EMAIL,
              pass: SMTP_PASSWORD,
            },
          });
          try {
            const testResult = await transport.verify();
            
          } catch (error) {
         
            return;
          }
        
          try {
            const sendResult = await transport.sendMail({
              from: SMTP_EMAIL,
              to:email,
              subject:"reset password",
              html:compileWelcomeTemplate("reset Password", `http://localhost:3000/resetPassword?token=${user.token}&email=${email}`),
            });
         
          return NextResponse.json({message:"تم الإرسال بنجاح"})
          } 
          catch (error) {
            return NextResponse.json({message:"خطأ في ارسال  رسالة إعادة تعيين كلمة المرور"},{status:500})
          }
        
              
            }




} catch (error) {
  return NextResponse.json({message:"خطأ في ارسال  رسالة إعادة تعيين كلمة المرور"},{status:500})
}


    
}