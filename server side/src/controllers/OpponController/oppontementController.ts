import { Request, Response, NextFunction } from "express";
import { prisma } from "../..";
import { date } from "zod";
export const get_Patients_Withِ_All_Oppontment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getOppontement = await prisma.oppontement.findMany({
      select: { doctor: {select:{doctorName:true}, }, patient:{select:{patName:true,phone:true,address:true,id:true}},date:true },
    });
    res.json(getOppontement);
  } catch (error) {}
};
export const get_Patient_With_OppontmentByNam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getOppontement = await prisma.oppontement.findMany({
      where: { patient: { patName: { contains: req.body.name } } },
      include: { doctor: true, patient: true },
    });
    res.json(getOppontement);
  } catch (error) {}
};
export const getOppontement_Of_Today = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date() // Get the current date in YYYY-MM-DD format

    const startDate =new Date(

      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
    const endDate = new Date(startDate.getTime() +24 * 60 * 60 * 1000-1);

    const getOppontement = await prisma.oppontement.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        patient: { select: { patName: true } },
        doctor: { select: { doctorName: true } },
      },
    });
    res.json(getOppontement);
  } catch (error) {}
};
