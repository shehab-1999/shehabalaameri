import db from "@/db/db";
import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
interface WeekWork {
  day: string;
  startTime: string;
  endTime: string;
}
// دالة إضافة طبيب
export async function POST(req: Request) {
  const formData = await req.formData(); // استخدام formData لقراءة البيانات
// استلام بيانات الأسبوع
  const doctorName = formData.get('doctorName');
  const specialist = formData.get('specialist');
  const phone = formData.get('phone');
  const information = formData.get('information');
  const depName = formData.get('department[depName]');
  let number:any=1;
  number = formData.get('number');
  
  const weekWorks: WeekWork[] = [];

  for (let i = 0; i <number; i++) {
    weekWorks.push({day:`${formData.get(`weekwork[${i}][day]`)}`,endTime:`${formData.get(`weekwork[${i}][endTime]`)}`,startTime:`${formData.get(`weekwork[${i}][startTime]`)}`})
  }
 
  // إضافة كائنات إلى المصفوفة
  const file = formData.get('img') as File;
  

  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف

  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_${Date.now()}.${file.name.split('.').pop()}`;
    await fs.writeFile(`${process.cwd()}/public/images/${imagePath}`, Buffer.from(data));
  }

  try {
    // Find the department
    const depart = await db.department.findFirst({
      where: { depName: depName as any },
      select: { id: true }
    });

    if (!depart) {
      return NextResponse.json({ message: 'القسم غير موجود' }, { status: 404 });
    }

  

    // Create the doctor with the associated department and weekdays
    const newDoctor = await db.doctor.create({
      data: {
        doctorName: doctorName as any,
        specialist: specialist as any,
        phone: phone as any,
        information: information as any,
        department: { connect: { id: depart.id } },
        img: imagePath, // سيتم حفظ null إذا لم يتم إرسال ملف
        weekwork: { create: weekWorks as any }
      },
      include: { weekwork: true }
    });

    
      return NextResponse.json({ message: 'تمت الإضافة بنجاح' });
    

  } catch (error:any) {
    if(error.code=='P2002'){

      return NextResponse.json({ message: ' اسم الدكتور موجود بالفعل' }, { status: 409});
    }
    return NextResponse.json({ message: 'خطأ في إضافة القسم' }, { status: 500 });
  }
};

export async function PUT(req: Request) {
  const formData = await req.formData(); // استخدام formData لقراءة البيانات
// استلام بيانات الأسبوع
  const doctorName = formData.get('doctorName');
  const specialist = formData.get('specialist');
  const phone = formData.get('phone');
  const information = formData.get('information');
  const depName = formData.get('department[depName]');
  let number:any=1;
  number = formData.get('number');
  
  const weekWorks: WeekWork[] = [];

  for (let i = 0; i <number; i++) {
    weekWorks.push({day:`${formData.get(`weekwork[${i}][day]`)}`,endTime:`${formData.get(`weekwork[${i}][endTime]`)}`,startTime:`${formData.get(`weekwork[${i}][startTime]`)}`})
  }
 
  const file = formData.get('img') as any;
  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف

  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_${Date.now()}.${file.name.split('.').pop()}`;
    await fs.writeFile(`${process.cwd()}/public/images/${imagePath}`, Buffer.from(data));
  }
  const { searchParams } = new URL(req.url);
  
  const id = searchParams.get('id');
  try {
    // Find the department

    
    const depart = await db.department.findFirst({
      where: { depName: depName as any },
      select: { id: true }
    });

    if (!depart) {
      return NextResponse.json({ message: 'القسم غير موجود' }, { status: 404 });
    }



    

    // Create the doctor with the associated department and weekdays

    

      if(file=='null'){

        const newDoctor = await db.doctor.update({
          where:{id:id as any},
          data: {
            doctorName: doctorName as any,
            specialist: specialist as any,
            phone: phone as any,
            information: information as any,
            department: { connect: { id: depart.id } },
             // سيتم حفظ null إذا لم يتم إرسال ملف
             weekwork: {  deleteMany:{docID:id as string},create: weekWorks as any }
          },
          include: { weekwork: true }
        });
    
        if (newDoctor) {
          return NextResponse.json({ message: 'تمت الإضافة بنجاح' },{status:200});
        }
      }

   else{
    
    const newDoctor = await db.doctor.update({
      where:{id:id as string},
      data: {
        doctorName: doctorName as any,
        specialist: specialist as any,
        phone: phone as any,
        information: information as any,
        img:imagePath as any,
        department: { connect: { id: depart.id } },
        
        // سيتم حفظ null إذا لم يتم إرسال ملف
        weekwork: {  deleteMany:{docID:id as string},create: weekWorks as any }
      },
      include: { weekwork: true }
    });

    if (newDoctor) {
      return NextResponse.json({ message: 'تمت الإضافة بنجاح' },{status:200});
    }
   }
 
  } catch (error:any) {
    if(error.code =='P2002'){

      return NextResponse.json({ message: ' اسم الدكتور موجود بالفعل' }, { status: 409});
    }
    return NextResponse.json({ message: 'خطأ في إضافة القسم' }, { status: 500 });
  }
};
// دالة الحصول على جميع الأطباء
export async function GET() {
  try {
    const doctors = await db.doctor.findMany({
      where: { isDeleted: false },
      select: { 
        id:true,
        img:true,
        doctorName:true,
        specialist:true,
      
        department:{select:{depName:true}},
        phone:true,
        information:true,
        weekwork:{select:{startTime:true,endTime:true,day:true}},
        patient:true,
        
       
      },
    });
    if (doctors) {
      return Response.json(doctors);
    }
  } catch (error) {
    return Response.json({ message: 'خطأ في جلب الأطباء', error });
  }
};

