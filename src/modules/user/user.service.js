import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { UserMsg } from "./user.messages.js"
import { StatusCodes } from "http-status-codes"
import createHttpError from "http-errors"

export const UserService = (() => {
    class UserService {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.UserModel
        }

        async changeUserRole(req, res, next) {
            try {
                const { id } = req.params
                const { role } = req.body
                const user = await this.#model.findByPk(id, {
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }) || (() => {
                    throw new createHttpError.NotFound(UserMsg.USER_NOT_FOUND);
                })();
                user.role = role ? role : user.role;
                await user.save()

                res.status(StatusCodes.ACCEPTED).json({
                    success: true,
                    message: UserMsg.USER_CHANGE_ROLE,
                    user
                })

            } catch (error) {
                next(error)
            }
        }
    }
    return new UserService()
})()