import { config } from "dotenv"
import express from "express"
import morgan from "morgan"
import { sequelizeConfig } from "./src/models/index.js"
import { ErrorHandler } from "./src/error/error.handlers.js"
import { AdminRoutes } from "./src/routes/admin.routes.js"
import expressEjsLayouts from "express-ejs-layouts"
import { MainRouter } from "./src/routes/main.routes.js"
config()

export const app = express()

const main = async () => {
    app.use(morgan("dev"))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static("public"))
    app.set("view engine", "ejs")
    app.set("views", "./views")
    app.use(expressEjsLayouts);
    app.set('layout', 'index');

    app.use("/", MainRouter)
    app.use("/admin", AdminRoutes)
    await sequelizeConfig()
    ErrorHandler().initialize()
    const port = process.env.SERVER_PORT
    app.listen(port, () => {
        console.log(`server is runnig on http://127.0.0.1:${port}`);
    })
}

main()
