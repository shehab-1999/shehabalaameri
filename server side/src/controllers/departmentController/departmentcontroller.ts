import { Request, Response, NextFunction } from "express";
import { prisma } from "../..";

export const addDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { depName } = req.body;
  try {
    const department = await prisma.department.create({
      data: {
        depName,
      },
    });
    res.json(department);
  } catch (error) {
    next(error)
  }
};

export const getDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await prisma.department.findMany({
      select: {id: true, depName: true, doctors:{select:{doctorName:true}} },
    });
    res.json(department);
  } catch (error) {}
};

export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await prisma.department.findMany({
      where: { id: req.params.id },
      select: {depName: true },
    });
    res.json(department);
  } catch (error) {}
};
export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await prisma.department.update({
      where: { id: req.params.id },
      data: {
        depName: req.body.depName,
      },
    });
    res.json(department);
  } catch (error) {}
};


export const deleteDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await prisma.department.delete({
      where: { id: req.params.id },
    });
    res.json(department);
  } catch (error) {}
};
export const getNewsDepart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await prisma.department.findFirst({
      where: { depName: req.body.depName },
      include: { news: true },
    });
    res.json(news);
  } catch (error) {}
};
export const searchDepart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departments = await prisma.department.findMany({
      where: {
        depName: {
          contains: req.body.depName,
        },
      },
    });
    res.json(departments);
  } catch (error) {}
};
