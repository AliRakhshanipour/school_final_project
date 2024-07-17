import { Router } from "express";
import { FieldRoutes } from "./field.routes.js";

const router = Router()
router.get("/login", (req, res) => {
    res.render("pages/login.ejs")
})


router.get("/signup", (req, res) => {
    res.render("pages/signup.ejs")
})

router.get("/", (req, res) => {
    res.render("pages/main.ejs")
})

router.use("/", FieldRoutes)

export {
    router as MainRouter
}
