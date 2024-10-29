
import db from "@/db/db";
import { message } from "antd";
import next, { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

// pages/api/patients.js

export async function POST(request: Request) {
  const { depName } = await request.json(); // تحويل الجسم إلى JSON
  try {
    //     let depart = await db.department.findFirst({
    //       where: { depName:depName,isDeleted:false },
    //     });
    // console.log(depName.depName)
    //     if (depart) {
    //       console.log("firs")
 
    //     }

    const department = await db.department.create({ data: { depName } });
if(department)
    return NextResponse.json(department);
  } catch (error: any) {
    if (error.code == "P2002") {
      return NextResponse.json(
        { message: " اسم القسم موجود بالفعل" },
        { status: 409 }
      );
    }
    // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const departments = await db.department.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        depName: true,
        doctors: { where: { isDeleted:false } },
      },
    });
    // تحقق من نوع الطلب

    if (departments) return NextResponse.json(departments);
  } catch (error) {

    return NextResponse.json(
      { message: "Error fetching departments" },
      { status: 500 }
    ); // إرجاع 500 في حالة وجود خطأ
  }
}
export async function PUT(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const { depName } = await request.json();
  try {
    const department = await db.department.update({
      where: { id: id as any },
      data: {
        depName,
      },
    });
    return NextResponse.json(department);
  } catch (error: any) {
    if (error.code == "P2002") {
      return NextResponse.json(
        { message: " اسم القسم موجود بالفعل" },
        { status: 409 }
      );
    }
    // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}
