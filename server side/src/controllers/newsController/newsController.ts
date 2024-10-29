import { Request,Response,NextFunction } from "express";
import { prisma } from "../..";
import upload from "../../middleware/multermiddleware";

export const addNews = async (req: Request, res: Response, next: NextFunction) => {
  const { headline, title, depName, userName } = req.body;
  
  try {
    const user = await prisma.users.findFirst({
      where: { userName },
      select: { id: true }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const departmentId = await prisma.department.findFirst({
      where: { depName },
      select: { id: true }
    });

    if (!departmentId) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const newNews = await prisma.news.create({
      data: {
        headline,
        title,
        img: req.file?.filename,
        user: {
          connect: {
            id: user.id
          }
        },
        department: {
          connect: {
            id: departmentId.id
          }
        }
      },
      include: { user: true, department: true }
    });

    res.status(201).json(newNews);
  } catch (error) {
    next(error);
  }
};
export const updatenews=async(req:Request,res:Response,next:NextFunction)=>{
  const {headline,title,depName,userName}=req.body
  try {
      
  const user = await prisma.users.findFirst({
      where: {userName},select:{id:true}
    });
    
  const departmentId=await prisma.department.findFirst({where:{depName},select:{id:true}})
   
  
    const News = await prisma.news.update({
      where:{id:req.params.id},
      data: {
        headline,
        title,
        
        img:req.file?.filename,
        user: {
          connect: {
            id: user?.id
          }
        },
        department: {
          connect: {
            id: departmentId?.id
          }
        }
      },include:{department:true}
    });
    res.json(News)
  } catch (error) {
      console.log(error)
  }
  }
  export const getallnews=async(req:Request,res:Response,next:NextFunction)=>{
    
    try {
      const news = await prisma.news.findMany({
       include:{department:true,user:true}
      });
   res.json(news)
    } catch (error) {
        console.log(error)
    }
    }
    export const getNewsById=async(req:Request,res:Response,next:NextFunction)=>{
      try {
        const news = await prisma.news.findUnique({
          where:{id:req.params.id},
         include:{department:true,user:true}
        });
     res.json(news);
      } catch (error) {
          console.log(error)
      }
      }
    export const deleteAllnews=async(req:Request,res:Response,next:NextFunction)=>{
    
      try {
        const news = await prisma.news.deleteMany();
     res.json(news)
      } catch (error) {
          console.log(error)
      }
      }
      export const deletNewsById=async(req:Request,res:Response,next:NextFunction)=>{
    
        try {
          const news = await prisma.news.delete({
           where:{id:req.params.id}
          });
       res.json(news)
        } catch (error) {
            console.log(error)
        }
        }