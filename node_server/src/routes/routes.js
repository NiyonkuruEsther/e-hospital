import { Router } from "express";
import Authentication from "../controller/auth.js";
import MedicalController from "../controller/index.js";
import Users from "../controller/users.js";
import Disease from "../controller/disease.js";
import Consultation from "../controller/consultation.js";
import Medicine from "../controller/medicines.js";
import ConsultationPharmacist from "../controller/consultationPharmacist.js";

const { FetchData } = MedicalController;
const { Login, Signup } = Authentication;
const { getUser, getUsers } = Users;
const { createPatientDescription, getPatientDescription } = Disease;
const { getConsultation, createConsultation } = Consultation;
const { getMedicine, createMedicine } = Medicine;
const { createConsultationPharmacist, getConsultationPharmacist } =
  ConsultationPharmacist;

const router = Router();

router.post("/auth/user/signup", Signup);
router.get("/users/single/:email", getUser);
router.get("/users/all", getUsers);
router.post("/auth/user/login", Login);
router.get("/disease", getPatientDescription);
router.post("/disease", createPatientDescription);
router.post("/consultation", createConsultation);
router.get("/consultation", getConsultation);
router.post("/consultation/pharmacist", createConsultationPharmacist);
router.get("/consultation/pharmacist", getConsultationPharmacist);
router.post("/medicine", createMedicine);
router.get("/medicine", getMedicine);
router.get("/:id", FetchData);
export default router;
