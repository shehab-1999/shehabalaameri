import db from "@/db/db";
import { NextResponse } from "next/server";

interface Permission {
  page: string;
  actions: string[];
}

export async function GET(request: Request) {
  try {
    const permission = await db.permissions.findMany(
    
    );

    return NextResponse.json(
      permission.sort((a: { actions: string; }, b: { actions: string; }) => {
        // تقسيم النصوص إلى مصفوفات
        const actionsA = a.actions.split(", ").sort();
        const actionsB = b.actions.split(", ").sort();

        // مقارنة عدد الإجراءات
        if (actionsA.length !== actionsB.length) {
          return actionsA.length - actionsB.length; // ترتيب حسب عدد الإجراءات
        }

        // إذا كانت الأطوال متساوية، مقارنة النصوص
        return a.actions.localeCompare(a.actions);
      })
    );
  } catch (error) {
    return NextResponse.json({ message: "forbidden" }, { status: 500 });
  }
}

export async function GETt(request: Request) {
  const email = request.headers.get("authorization")?.split(" ")[1];
  let permissionsToCreate: Permission[] = [];

  const entities: string[] = [
    'Departments',
    "News",
    "Patients","Doctors"
  ];
  const actions: string[] = ["إضافة", "تعديل", "حذف"];

  const generateCombinations = (arr: string[]): string[][] => {
    const result: string[][] = [];
    const totalCombinations = Math.pow(2, arr.length);

    for (let i = 1; i < totalCombinations; i++) {
      const combination: string[] = [];
      for (let j = 0; j < arr.length; j++) {
        if (i & (1 << j)) {
          combination.push(arr[j]);
        }
      }
      result.push(combination);
    }

    return result;
  };

  // حساب المجموعات
  const combinations = generateCombinations(actions);

  for (const entity of entities) {
    combinations.forEach((action) => {
      permissionsToCreate.push({ page: entity, actions: action });
    });
  }

  // إدخال الأذونات في قاعدة البيانات
  async function insertPermissions() {
    for (const entity of entities) {
      const read = await db.permissions.createMany({
        data: [{ page: entity, actions: "قراءة" },{ page: entity, actions: "إخفاء الصفحة" }],
      });
    }
    for (const permission of permissionsToCreate) {
      const actionsText = permission.actions.join(", "); // تحويل المصفوفة إلى نص مفصول بفواصل
      await db.permissions.create({
        data: {
          page: permission.page,
          actions: actionsText, // تخزين النص مباشرة
        },
      });
    }
    console.log("تم إدخال الأذونات بنجاح");
  }

  insertPermissions();

  return NextResponse.json(permissionsToCreate);

  try {
    const user = await db.users.findMany({
      where: { email },
      select: { email: true, password: true, role: true },
    });

    if (user.length == 0) {
      return NextResponse.json(0);
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "forbidden" }, { status: 500 });
  }
}
