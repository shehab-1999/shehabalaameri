
import {Users} from "@prisma/client"
// import { Request } from "express";
// declare module 'express' {
// export interface Request {
//     user?: User;
//   }
// }
// interface Application<T> {
//   // ... other properties
//   errorHandler: (method: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (err: any, req: Request, res: Response, next: NextFunction) => Promise<void>;
// }

// const app: Application<Record<string, any>> = {
//   // ... other properties
//   errorHandler,
// };
// import { User } from "@prisma/client";
// export interface RequestWithUser extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//     user: User;
//   }
  

export interface  Session{
    id: string;
    expirationDate: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}