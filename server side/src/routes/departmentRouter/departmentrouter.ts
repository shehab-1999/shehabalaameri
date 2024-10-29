import { Router } from "express";
import { addDepartment, deleteDepartmentById, getDepartment, getDepartmentById, getNewsDepart, searchDepart, updateDepartment } from "../../controllers/departmentController/departmentcontroller";
const routerDepart:Router=Router()

routerDepart.post("/adddepartment",addDepartment)
routerDepart.get("/getnews_depart",getNewsDepart)
routerDepart.get("/getDepartment",getDepartment)
routerDepart.get("/getDepartmentById/:id",getDepartmentById)
routerDepart.put("/updateDepartment/:id",updateDepartment)
routerDepart.delete("/deleteDepartment/:id",deleteDepartmentById)
routerDepart.get("/search_depart",searchDepart)
export default routerDepart