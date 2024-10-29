import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secret";
import { ErrorCode } from "../../exceptions/root";
import { BadRequestsException } from "../../exceptions/bad-request";
import { userZodSchema } from "../../../prisma/valdateInput";
import { NotFoundException } from "../../exceptions/not-found";
import { UnprocessableEntity } from "../../exceptions/valdations";
import { createSession,verifySession } from "../../session.services";
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userZodSchema.parse(req.body)
    const { email, userName, password, roleName } = req.body;

    let user = await prisma.users.findFirst({
      where: { email },
    });

    if (user) {
      return next(
        new BadRequestsException(
          "User already exists!",
          ErrorCode.USER_ALREADY_EXISTS
        )
      );
    }

    user = await prisma.users.create({
      data: {
        email,
        userName,
        password: hashSync(password, 10),
       role:"Admin"
        // permissions:{connect:permissionId.map((perId:string)=>({id:perId}))}
      },
     
    });
    const session = await createSession(user.id); // إنشاء جلسة للمستخدم

    res.json({ user, session });
  } catch (err: any) {
    next(
      new UnprocessableEntity(
        err?.cause?.issues,
        "Unprocessable Entity",
        ErrorCode.UPPROCESSABLE_ENTITY
      )
    );
  }
};
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.users.findMany({
      where:{isDeleted:false}
     
    });

   
    res.json(users);
  } catch (err: any) {
    next(
      new Error("Error fetching users: " + err.message)
    );
  }
};
export const getUserbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId=req.params.id;
    const users = await prisma.users.findFirst({
      where:{id:userId}
     
    });

   
    res.json(users);
  } catch (err: any) {
    next(
      new Error("Error fetching users: " + err.message)
    );
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { email, userName, password,roleName} = req.body;
    const userId=req.params.id;
    let user = await prisma.users.update({
      where: { id: userId },
      data: {
        email: email,
        userName: userName,
        password: hashSync(password, 10),
        role:roleName
      
      },
    });
    if (!user) {
      throw new Error("can't update user");
    }

    // const session = await createSession(user.id);
    res.json({ user });
  } catch (err: any) {
    next(
      err
    );
  }
};
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  try {
    const deleteuser = await prisma.users.update({
      where: { id: userId },
      data: { isDeleted: true },
    });
    res.json(deleteuser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prisma.users.findFirst({
    where: { email }
  });
  if (!user) {
    throw new NotFoundException(
      "User does not exist",
      ErrorCode.USER_NOT_FOUND
    );
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestsException(
      "Incorrect password",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

const session=await createSession(user.id);
  res.cookie("token", token, {
    sameSite: "strict",
    maxAge: 3600000, // 1 hour,
  });
  res.json({  user: {
    id: user.id,
    email: user.email,
    userName: user.userName,
    role:user.role
    
  }, token,session });
};





export const validateSession = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

  const sessionToken = req.headers.authorization?.split(' ')[1];
  if (!sessionToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const isValid = await verifySession(sessionToken);
    if (isValid) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(401).json({ valid: false, message: 'Invalid session' });
    }
  } catch (error) {
    console.error('Error validating session:', error);
    return res.status(500).json({ message: 'Error validating session' });
  }
};
// export const logout = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId } = req.body;
//       await deleteSessions(userId);
//       res.status(200).json({ message: 'Logout successful' });
//     } catch (err) {
//       next(err);
//     }
//   };
// export const validate = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { userId, id } = req.body;
//     await validateSession(userId, id);
//     res.status(200).json({ message: 'Validate' });
//   } catch (err) {
//     next(err);
//   }
// };
// export const login=async(req:Request,res:Response)=>{

//     const {email,password}=req.body;
//     let user=await prisma.users.findFirst({
//       where:{email}
//     });
//     if(!user)
//     {
//       throw new NotFoundException('user does not exist',ErrorCode.USER_NOT_FOUND)
//     }

//   if(!compareSync(password,user.password))
//   {
//     throw new BadRequestsException('password not correct!',ErrorCode.INCORRECT_PASSWORD);
//   }
//   const token=jwt.sign({
//     userId:user.id
//   },JWT_SECRET,{expiresIn:"1h"});

//     res.json({user,token})
//   }

//   export const me = async (req:Request, res: Response,next:NextFunction) => {

//     res.json(req.user);
//   };

// export const signUp = async (req: Request, res: Response, next: NextFunction) => {
//   signupSchema.parse(req.body);
//   const { email, name, password ,role} = req.body;
//   let user = await prisma.users.findFirst({
//     where: { email }
//   });
//   if (user) {
//     next(new BadRequestsException('User already exists!', ErrorCode.USER_ALREADY_EXISTS));
//   }
//   user = await prisma.users.create({
//     data: {
//       email,
//       name,
//       password: hashSync(password, 10),
//       role
//     }
//   });

//   // Create a new session for the user

// };
