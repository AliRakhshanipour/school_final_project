import { Router } from "express";
import { UserRoutes } from "./user.routes.js";
import { StudentRoutes } from "./student.routes.js";

const router = Router()
router.use("/user", UserRoutes)
router.use("/student", StudentRoutes)

export { router as MainRoutes }