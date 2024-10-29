// // pages/_middleware.ts
// import { NextResponse, NextRequest } from 'next/server';
// import { middleware as checkPermissions } from './checkPermision';

// export const config = {
//   matcher: ['/Dashboard/:path*'],
// };

// export default async function middleware(req: NextRequest) {

//   const response = await checkPermissions(req);

//   if (response) {
//     return response;
//   }
//   return NextResponse.next();
// }
// middleware.ts

import axios from "axios";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { apifetch } from "./api";
import { url } from "inspector";
import { JWT_SECRET } from "./secret";
import { message } from "antd";
import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";
import { URL } from "url";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest,req:any) {
  let token = request.cookies.get("next-auth.session-token")?.value;
  
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
  
    token = authHeader.split(" ")[1]; // إذا كان النوع هو Bearer
    // قم بمعالجة التوكن هنا
  }
if(!token){
 
  const url = request.nextUrl.clone();
  if(request.nextUrl.pathname==='/Dashboard'){
    url.pathname = '/login'; // تغيير المسار إلى /login
    return NextResponse.redirect(url);
  }
  else{
    return NextResponse.json("forrbidden",{status:403})
  }

}
  const protectedPaths = [
   "/Dashboard/user",
  ];

 
//   if (token) {
   
// try {

  
//   const response = await apifetch.get(`/login`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });


//   if (response.status === 200 && response.data) {
 
//     if (response.data.map((user: any) => user.role) == 'user') {

//        if (protectedPaths.includes(request.nextUrl.pathname)) {
//       // تحقق من نوع الطلب (GET أو POST أو PUT)
// //if(request.nextUrl.pathname=="/Dashboard/user"){
//   return NextResponse.json("غير مخول لدخول هذه الصفحة"); 
// }
//       if (request.method === "PUT") {
//         // إذا لم يكن هناك توكن، أعد الاستجابة 401

//         return NextResponse.json({ message: "غير مخول" }, { status: 401 });
//       }
//     }
//     if (response.data.map((user: any) => user.role) == "admin") {
//       return NextResponse.next();
//     } 
//   } else{ 
//     return NextResponse.json("forbidden"); 
  

// }
// } catch (error) {
//   if(request.url==="http://localhost:3000/Dashboard"){
//     return NextResponse.redirect(new URL('/login',request.url))
//    }
//   return NextResponse.json("forbidden"); 
// }

//   }

 
  // إعادة التوجيه إذا لم يكن هناك توكن

  // السماح بالاستمرار إذا كان هناك توكن
}

// تحديد المسارات التي سيعمل عليها middleware
export const config = {
  matcher: ['/Dashboard/',
   "/Dashboard/user/", "/api/user/",
    "/api/Department/", "/api/News/", "/api/appointment/","/api/Doctor/","/api/patient/",
   '/Dashboard/',
   '/Dashboard/doctor/',
   '/Dashboard/news/',
   '/Dashboard/department/','/Dashboard/patients/'
  ], // حدد المسارات المحمية
};
