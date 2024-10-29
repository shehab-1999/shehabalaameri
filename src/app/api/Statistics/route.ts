import PatientStatistics from "@/app/Dashboard/chart/chartpatients";
import Doctor from "@/app/Dashboard/doctor/doctorHome";
import db from "@/db/db";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const numberOfTypeGet =  request.headers.get('authorization')?.split(" ")[1];
    try {

   if(numberOfTypeGet=='1'){
    const bookings = await db.oppontement.groupBy({
      by: [ 'date'],
      _count: {
        patID:true
      },where: {
        date: {
          gte: new Date(new Date().getFullYear(), 0, 1), // Start of the year
        lt: new Date(new Date().getFullYear() + 1, 0, 1),// بداية السنة التالية
        },
      },
     
    });
  // إنشاء مصفوفة لتخزين عدد المرضى لكل شهر
  const monthlyCounts = Array(12).fill(0);

  bookings.forEach((booking) => {
    const month = booking.date.getMonth(); // الحصول على رقم الشهر (0-11)
    monthlyCounts[month] += booking._count.patID; // إضافة العدد إلى الشهر المناسب
  });


    return NextResponse.json(monthlyCounts.map((count, index) => ({ month: index + 1, count })))

   }
   if(numberOfTypeGet=='2'){
    const doctors = await db.doctor.findMany({
      where: {
        isDeleted: false,  // يمكنك إضافة شروط إضافية إذا لزم الأمر
      },
      include: {
       
        department: {
          select: {
            depName: true,
          },
        },
      },
    });
  
    // تجميع الأطباء حسب القسم
    const counts = doctors.reduce((acc:any, doctor) => {
      const depName = doctor.department.depName;
    
      if (!acc[depName] ) {
      
        acc[depName] = { name: depName, value: 0 ,y:0 };
      }

      acc[depName].value += 1;
      acc[depName].y +=1;
      return acc;
    }, {});
  
    // تحويل الكائن إلى مصفوفة
  
  // إنشاء مصفوفة لتخزين عدد المرضى لكل شهر
  return NextResponse.json(Object.values(counts));
   }
   if(numberOfTypeGet=="3"){
    
    const doctors = await db.doctor.findMany({
      where: {
        isDeleted: false,  // يمكنك إضافة شروط إضافية إذا لزم الأمر
      },
      select: {
        doctorName:true,
          _count: {
            select: { patient:true},
          },
       
      },
    });
    return NextResponse.json(doctors,)
   }
 
   else{
   
    const doctors = await db.department.findMany({
      where: {
        isDeleted: false, // يمكنك إضافة شروط إضافية إذا لزم الأمر
      },
      select: {
        depName:true,
        
    doctors:{select:{doctorName:true,_count:{select:{patient:true}}}},
          _count: {
            select: { doctors:true},
          },
       
      },
    });
    const chartPatientInDepartment = doctors.map(department => {
      
      return {
          name: department.depName,
         
          value: department.doctors.reduce((total,value)=>total+value._count.patient,0)
      };
  });
  const chartPatients = doctors.flatMap(doctors => 
    doctors.doctors.map(doctor => ({
        
       
      name: doctor.doctorName,
      value: doctor._count.patient
    }))
);
const chartDepartments = doctors.flatMap(department => {return({
  name:department.depName,
  value:department._count.doctors,
})

}
 
);
 

    return NextResponse.json({chartDepartments,chartPatients,chartPatientInDepartment})
    
    return NextResponse.json({message:"foribidden"},{status:401})
   }
    
    } catch (error) {
      return NextResponse.json({ message: "خطأ في جلب البيانات" }, { status: 500 });
    }
  }
  export async function POST(request: Request) {
    try {
 
      const doctors = await db.doctor.findMany({
        where: {
          isDeleted: false,  // يمكنك إضافة شروط إضافية إذا لزم الأمر
        },
        include: {
          department: {
            select: {
              depName: true,
            },
          },
        },
      });
    
      // تجميع الأطباء حسب القسم
      const counts = doctors.reduce((acc:any, doctor) => {
        const depName = doctor.department.depName;
       //@ts-ignore
        if (!acc[depName] ) {
        //@ts-ignore
          acc[depName] = { name: depName, value: 0 ,y:0 };
        }
 //@ts-ignore
        acc[depName].value += 1;
        acc[depName].y +=1;
        return acc;
      }, {});
    
      // تحويل الكائن إلى مصفوفة
    
    // إنشاء مصفوفة لتخزين عدد المرضى لكل شهر
    return NextResponse.json(Object.values(counts));
    
    } catch (error) {
      return NextResponse.json({ message: "خطأ في جلب الصلاحيات" }, { status: 500 });
    }
  }