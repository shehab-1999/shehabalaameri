import { z } from 'zod';

export const userZodSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(4,"u must input at least 4"),
  roleName:z.string()
});

export const newsZodSchema = z.object({
  headline: z.string(),
  title: z.string(),
  img: z.string().url()
});


export const staffZodSchema = z.object({
  staffName: z.string(),
  phone: z.string().optional(),
});


  
export const patientZodSchema = z.object({
  patName: z.string(),
  address: z.string().optional(),
  doctorBack: z.date().optional(),
  phone: z.string(),
});
export const doctorTypeZodSchema = z.object({
  doctorName: z.string(),
  phone: z.string().optional(),
  specialist: z.string(), 
  patient:z.array(patientZodSchema)
});

export const shiftZodSchema = z.object({ 
  startTime: z.string(),
  endTime: z.string(), 
});

