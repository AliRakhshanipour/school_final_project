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
            res.status(StatusCodes.NOT_FOUND).json({
                message: ErrMsg.NOT_FOUND,
            });
        }

        errorHandler(err, req, res, next) {
            const status = err.status || err.statusCode || 500
            res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: err.message || ErrMsg.INTERNAL_SERVER_ERROR,
            });
        }

        initialize() {
            this.#app.use(this.notFoundHandler);
            this.#app.use(this.errorHandler);
        }
    }
    return new ErrorHandler()
})

