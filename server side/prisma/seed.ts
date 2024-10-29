import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const entities = ['user', 'note'];
    const actions = ['create', 'read', 'update', 'delete'];
    const accesses = ['own', 'any'] as const;
    let permissions = [];

    for (const entity of entities) {
        for (const action of actions) {
            for (const access of accesses) {
                permissions.push({ entity, action, access });
            }
        }
    }
    try {
        await prisma.permission.createMany({ data: permissions });
        console.log('Permissions created successfully');
    } catch (error) {
        console.error('Error creating permissions:', error);
    }
}



 seed().catch(err=>console.log(err)).finally(async()=>{
    await prisma.$disconnect();
 })
