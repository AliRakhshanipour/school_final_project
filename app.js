import { config } from "dotenv"
import express from "express"
import morgan from "morgan"
import { sequelizeConfig } from "./src/models/index.js"
import { ErrorHandler } from "./src/error/error.handlers.js"
import { MainRoutes } from "./src/routes/main.routes.js"
config()

export const app = express()

const main = async () => {
    app.use(morgan("dev"))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static("public"))

    app.use("/", MainRoutes)
    await sequelizeConfig()
    ErrorHandler().initialize()
    const port = process.env.SERVER_PORT
    app.listen(port, () => {
        console.log(`server is runnig on http://127.0.0.1:${port}`);
    })
}

main()
