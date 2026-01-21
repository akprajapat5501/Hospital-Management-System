import express from 'express';
import { patientRegister, Login, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor } from '../controllers/userController.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", Login);
router.post("/admin/add", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addNew", isAdminAuthenticated, addNewDoctor);

export default router;