import { z } from "zod";

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