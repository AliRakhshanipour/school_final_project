import { StatusCodes } from "http-status-codes"
import { app } from "../../app.js"
import { ErrMsg } from "./error.messages.js"

export const ErrorHandler = (() => {
    class ErrorHandler {
        #app
        constructor() {
            this.#app = app
        }

        notFoundHandler(req, res, next) {
            res.status(StatusCodes.NOT_FOUND);
            res.render("error/404", { title: "404 Not Found", layout: false });
        }

        errorHandler(err, req, res, next) {
            const status = err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
            res.status(status);
            res.json({
                message: err.message || "Internal Server Error",
            });
        }


        initialize() {
            this.#app.use(this.notFoundHandler);
            this.#app.use(this.errorHandler);
        }
    }
    return new ErrorHandler()
})

