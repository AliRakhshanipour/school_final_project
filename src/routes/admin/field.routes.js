import { Router } from "express";
import { FieldController } from "../../modules/field/field.controller.js";
import { handleUploadErrors, upload } from "../../middlewares/multer.js";
import { FieldService } from "../../modules/field/field.service.js";

const router = Router()
router.post("/:fieldId/images", upload.single("image"), handleUploadErrors, FieldService.addImageToField)

router.post("/create", FieldController.createField)

router.get("/list", FieldController.getFieldList)

router.get("/field-details/:fieldId", FieldController.getField)




export { router as FieldRoutes }