import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {

    res.render("pages/admin/main.ejs")
})

export { router as DashboardRoutes }