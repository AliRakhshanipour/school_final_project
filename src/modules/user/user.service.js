import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { UserMsg } from "./user.messages.js"
import { StatusCodes } from "http-status-codes"


export const UserService = (() => {
    class UserService {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.User
        }

        async changeUserRole(req, res, next) {
            try {
                const { id } = req.params;
                const { role } = req.body;

                console.log(req.body);
                const user = await this.#model.findByPk(id, {
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                });

                if (!user) {
                    throw new Error(UserMsg.USER_NOT_FOUND);
                }

                await user.update({ role })

                res.status(StatusCodes.ACCEPTED).json({
                    success: true,
                    message: UserMsg.USER_CHANGE_ROLE,
                    user
                });
            } catch (error) {
                console.error("Error in changeUserRole:", error);
                next(error); // Pass the error to the error handling middleware
            }
        }
    }
    return new UserService()
})()