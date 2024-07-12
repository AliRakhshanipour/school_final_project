import { Router } from "express";
import { StudentController } from "../modules/student/student.controller.js";

const router = Router()
router.get("/list", StudentController.listStudents)
router.post("/create", StudentController.createStudent)

export { router as StudentRoutes }