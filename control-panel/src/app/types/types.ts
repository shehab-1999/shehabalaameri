// models/User.ts

import { any, z } from "zod";
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

export const userZodSchema = z.object({
  userName: z.string().min(4,"name is require").max(50,"name is too long"),
  email: z.string().email(),
  password: z.string().min(4,"u must input at least 4").max(10,"password is too long"),
  roleName:z.string()
});
export type userType=z.infer<typeof userZodSchema>;

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
export const departmentZodSchema=z.object({
  id:z.string().optional(),
  depName: z.string().nonempty("اسم القسم مطلوب"),
});

export const doctorZodSchema = z.object({
doctorName: z.string().min(10, "اسم الدكتور يجب أن يكون على الأقل 10 أحرف"),
phone: z.string().regex(phoneNumberRegex, "رقم الهاتف يجب أن يتكون من 9 أرقام"),
specialist: z.string().min(3, "التخصص يجب أن يكون على الأقل 3 أحرف"),
department: z.object({
  depName: z.string().nonempty("اسم القسم مطلوب"),
}).optional(), // يمكنك تحديد ما إذا كان هذا الحقل مطلوبًا أم لا
weekwork: z.array(z.object({
  day: z.string().nonempty("اليوم مطلوب"),
  startTime: z.string().nonempty("وقت البدء مطلوب"),
  endTime: z.string().nonempty("وقت الانتهاء مطلوب"),
})).optional(), // يمكنك تحديد ما إذا كان هذا الحقل مطلوبًا أم لا
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

export interface addNewsType{
  headline: string;
  title: string;
  img: any|null;
  user: string;
  department: string;
}
export interface Role {

  name: string;
 
}
  export interface News {
    id: string | null;
    headline: string;
    title: string;
    img: string;
    user: User;
    department: Department;
    createdAt: Date ;

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
    id: string;
    depName: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    staffs: Staff[];
    doctors: Doctor[];
    news: News[];
  }
  
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
    id: string;
    doctorName: string;
    phone: string | null;
    specialist: string;
    department: Department;
    depID: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    patient: Oppontement[];
    weekwork: Shift[];
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
    id: string;
    day: Day;
    startTime: string;
    endTime: string;
    doctor: Doctor | null;
    docID: string;
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