import { NextFunction, Request, Response } from "express";
import { UnAthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { prisma } from "..";
import { Users as User } from "@prisma/client";


const authMiddleware = async (req:Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    next(new UnAthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }

  try {
    const payload = jwt.verify(token as string, JWT_SECRET) as { userId: number };
    const user = await prisma.users.findFirst({
      where: { id: payload.userId },
    });

    // req.user = user;
    next();
  } catch (error) {
    next(new UnAthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED, error));
  }
};

export default authMiddleware;