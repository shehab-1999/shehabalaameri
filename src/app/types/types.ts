// models/User.ts

import { z } from "zod";
const phoneNumberRegex = /^[+]?[1-9]\d{1,14}$/;
export interface User {
  id: string; 
  userName: string; 
  email: string;
  password: string;
  createdAt?: Date|null
  updatedAt?: Date |null
  news: News[]
  role: string
}
export interface UpdateUser {
  id: string; 
  userName: string; 
  email: string;
  password: string;
  role: string

}


export const doctorZodSchema = z.object({
  img:z.instanceof(File).optional().nullable(),
  doctorName: z.string().min(10, "اسم الدكتور يجب أن يكون على الأقل 10 أحرف"),
  phone: z.string().regex(phoneNumberRegex, "رقم الهاتف يجب أن يتكون من 9 أرقام"),
  specialist: z.string().min(3, "التخصص يجب أن يكون على الأقل 3 أحرف"),
  department: z.object({
    depName: z.string().min(2,"اسم القسم مطلوب"),
  }),// يمكنك تحديد ما إذا كان هذا الحقل مطلوبًا أم لا
  weekwork: z.array(z.object({
    day: z.string().nonempty("اليوم مطلوب"),
    startTime: z.string().min(1,"وقت بدءالدوام ونهابة الدوام مطلوب"),
    endTime: z.string().min(1,"وقت بدءالدوام ونهابة الدوام مطلوب"),
  })).min(1," يجب إضافة أيام الدوام "), // يمكنك تحديد ما إذا كان هذا الحقل مطلوبًا أم لا
  information:z.string().optional()
});
export type doctroType = z.infer<typeof doctorZodSchema>;
export interface CreateUser{
  userName: string; 
  email: string;
  password: string;
  roleName: string
}

export interface Permission {
  id: string; 
  action: string; 
  entity: string; 
  access: string; 
  createdAt: Date; 
  updatedAt: Date;
  roles: Role[]; 
  users: User[]; 
}


export interface Role {

  name: string;
 
}
  export interface News {
    id: string;
    headline: string;
    title: string;
    img: string;
    user: User;
    userId: string;
    department: Department;
    depID: string;
  }
  
  export interface Session {
    id: string;
    expirationDate: Date;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: string;
  }
  
  export interface Department {
    actions: any;
    id: string;
    depName: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    staffs: Staff[];
    doctors: Doctor[];
    news: News[];
  }
  export const departmentZodSchema=z.object({
    id:z.string().optional(),
    depName: z.string().nonempty("اسم القسم مطلوب"),
  })
  export type departmentType=z.infer<typeof departmentZodSchema>
  export  interface Staff {
    id: string;
    staffName: string;
    phone: string | null;
    department: Department;
    depID: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }
  
  export interface Doctor {
   
    doctorName: string;
    phone: string | null;
    specialist: string;
    department:{depName:string};
    
   
   
    weekwork: Shift[];
  }
  export const userZodSchema = z.object({
    permissionPageDoctors:z.string().optional(),
    permissionPageNews:z.string().optional(),
    permissionPageDepartments:z.string().optional(),
    permissionPagePatients:z.string().optional(),
    userName: z.string().min(4, "الاسم مطلوب").max(50, "الاسم طويل جداً"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    password: z.string().min(4, "يجب إدخال كلمة مرور لا تقل عن 4 أحرف").max(100, "كلمة المرور طويلة جداً"),
    confirmPassword: z.string().min(4, "يجب تأكيد كلمة المرور").max(100, "كلمة المرور طويلة جداً"),
    roleName: z.string(),
    
  }).refine(data => data.password === data.confirmPassword, {
    message: "كلمات المرور لا تتطابق",
    path: ["confirmPassword"],
    
  });
  
  export type userType = z.infer<typeof userZodSchema>;
  
  // const imageSchema = z
  //   .instanceof(File)
  //   .refine((file) => file.size < 5 * 1024 * 1024).optional();
  
  export const newsZodSchema = z.object({
    headline: z.string().min(5, "Enter at least 5 letters").max(100, "Headline too long"),
    title: z.string().min(20, "Title is too short").max(1000, "Title is too long"),
    img:z.instanceof(File).optional().nullable(),
    user: z.string().min(5, "User must be at least 5 characters").max(50, "User is too long"),
    department: z.string().min(3, "Department must be at least 3 characters").max(20, "Department is too long"),
  });

  export type newsType=z.infer<typeof newsZodSchema>;
  export interface addNewsType{
    headline: string;
    title: string;
    img: any|null;
    user: string ;
    department: string;
  }
  export interface Patient {
    id: string;
    patName: string;
    address: string | null;
    gender: Gender | null;
    doctorBack: Date | null;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    doctor: Oppontement;
  }
  
  enum Gender {
    female,
    male
  }
  
  export interface Oppontement {
    doctor: Doctor;
    docID: string;
    patient: Patient;
    patID: string;
    createdAt: Date;
    date: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }
  
  export interface Shift {
   
    day: Day;
    startTime: string;
    endTime: string;
    
  }
  
  enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
  }