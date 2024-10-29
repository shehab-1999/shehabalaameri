import { Router } from "express";
import { addStaff,get_Staff_ById,delete_Staff,delete_Staff_ById, updateSttff, get_All_Staff } from "../../controllers/staffController/staffController";

const routerstaff:Router=Router()
routerstaff.post("/add_staff",addStaff)
routerstaff.put("/update_staff",updateSttff)
routerstaff.delete("/delete_staffId/:id",delete_Staff_ById)
routerstaff.delete("/delete_staff",delete_Staff)
routerstaff.get("/get_staffId/:id",get_Staff_ById)

routerstaff.get("/get_staff",get_All_Staff)
export default routerstaff