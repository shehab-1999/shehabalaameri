import { Router } from "express";
import { addPatient ,deletePatientById,updatePatient} from "../../controllers/patientController/patientController";
const routerPatient:Router=Router();

routerPatient.post('/addPatient',addPatient);
routerPatient.put('/update_patient',updatePatient)
routerPatient.delete("/deletePatient",deletePatientById)

export default routerPatient