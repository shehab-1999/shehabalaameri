import { Router } from "express";
import { getOppontement_Of_Today, get_Patient_With_OppontmentByNam, get_Patients_Withِ_All_Oppontment } from "../../controllers/OpponController/oppontementController";
const routerOppont:Router=Router()
routerOppont.get("/get_patient",get_Patients_Withِ_All_Oppontment);
routerOppont.get("/get_Oppont",getOppontement_Of_Today)
routerOppont.get("/get_patientName",get_Patient_With_OppontmentByNam)
export default routerOppont