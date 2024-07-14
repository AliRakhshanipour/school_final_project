import { Router } from "express";
import { FieldController } from "../modules/field/field.controller.js";

const router = Router()
router.get("/login", (req, res) => {
    res.render("pages/login.ejs")
})
router.get("/fields", FieldController.getFieldList)

router.get("/signup", (req, res) => {
    res.render("pages/signup.ejs")
})

router.get("/", (req, res) => {
    res.render("pages/main.ejs")
})

export {
    router as MainRouter
}
