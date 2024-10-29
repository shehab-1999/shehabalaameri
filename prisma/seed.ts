// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');


const prisma=new PrismaClient()

interface Permission {
  page: string;
  actions: string[];
}
async function main() {

 try {
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



    for (const entity of entities) {
      const read = await prisma.permissions.createMany({
        data: [{ page: entity, actions: "قراءة" },{ page: entity, actions: "إخفاء الصفحة" }],
      });
    }
    for (const permission of permissionsToCreate) {
      const actionsText = permission.actions.join(", "); 
      await prisma.permissions.create({
        data: {
          page: permission.page,
          actions: actionsText, // تخزين النص مباشرة
        },
      });
    }
    console.log("تم إدخال الأذونات بنجاح");
  

 
 } catch (error:any) {
  if(error.code=="P2002"){
    console.log("جميع الاذونات موجودة بالفعل ")
  }
  console.log(error)
 }
  const user = await prisma.users.create({
    data: {
      email:"shehabalaameri3@gmail.com",
      userName:"shehab",
      password: "$2b$10$KzexSF5dZbq3IlXOcnkJk.YtxbqpNUDsYJvqG09jjLvo3NnffzOzu",
      role: 'admin',
   

    },
  });
  if(user){
    console.log("تم اضافة المستخدم بنجاح")
  }
 

  

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
