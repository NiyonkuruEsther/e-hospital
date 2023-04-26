import { Router } from "express";
import Authentication from "../controller/auth.js";
import MedicalController from "../controller/index.js";
import Users from "../controller/users.js";
import Disease from "../controller/disease.js";
import Consultation from "../controller/consultation.js";

const { FetchData } = MedicalController;
const { Login, Signup } = Authentication;
const { getUser, getUsers } = Users;
const { createPatientDescription, getPatientDescription } = Disease;
const { getConsultation, createConsultation } = Consultation;

const router = Router();

router.get("/:id", FetchData);
router.post("/auth/user/signup", Signup);
router.get("/users/single/:email", getUser);
router.get("/users/all", getUsers);
router.post("/auth/user/login", Login);
router.post("/disease", createPatientDescription);
router.get("/disease/:id", getPatientDescription);
router.post("/consultation", createConsultation);
router.get("/consultation/:id", getConsultation);
export default router;
