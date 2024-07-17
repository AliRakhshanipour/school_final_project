import { Router } from "express";
import { SchoolControoler } from "../../modules/school/school.controller.js";

const router = Router()
router.post("/create", SchoolControoler.createSchool)


export { router as SchoolRoutes }