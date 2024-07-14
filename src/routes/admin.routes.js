import { Router } from "express";
import { UserRoutes } from "./user.routes.js";
import { StudentRoutes } from "./student.routes.js";
import { SchoolRoutes } from "./school.routes.js";
import { FieldRoutes } from "./field.routes.js";

const router = Router()
router.use("/user", UserRoutes)
router.use("/student", StudentRoutes)
router.use("/school", SchoolRoutes)
router.use("/field", FieldRoutes)

export { router as AdminRoutes }