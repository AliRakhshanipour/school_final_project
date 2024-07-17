import { Router } from "express";
import { StudentController } from "../../modules/student/student.controller.js";
import { StudentService } from "../../modules/student/student.service.js";

const router = Router()
router.get("/create-form", StudentService.getCreateStudentForm)
router.get("/list", StudentController.listStudents)
router.post("/create", StudentController.createStudent)
router.patch("/:id/change-status", StudentService.changeAcceptionStatus)
router.get("/:id", StudentController.getStudent)

export { router as StudentRoutes }