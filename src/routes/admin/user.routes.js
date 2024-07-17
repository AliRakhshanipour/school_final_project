import { Router } from "express";
import { UserController } from "../../modules/user/user.controller.js";
import { UserService } from "../../modules/user/user.service.js";

const router = Router()
router.get("/list", UserController.listUser)

router.post('/create', UserController.createUser)

router.patch("/update/:id", UserController.updateUser)

router.patch("/change-role/:id", UserService.changeUserRole)

router.delete("/delete/:id", UserController.deleteUser)

router.get("/:id", UserController.getUser)


export { router as UserRoutes }