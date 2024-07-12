import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { StatusCodes } from "http-status-codes"
import { UserMsg } from "./user.messages.js"
import { Op } from "sequelize"
import createHttpError from "http-errors"

export const UserController = (() => {
    class UserController {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.UserModel
        }

        async createUser(req, res, next) {
            try {
                const { username, password } = req.body
                const user = await this.#model.create({ username, password })
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: UserMsg.USER_CREATED,
                    user
                })
            } catch (error) {
                next(error)
            }
        }

        async listUser(req, res, next) {
            try {
                // Extract query parameters for pagination and filtering
                const { page = 1, limit = 10, username, role } = req.query;

                // Build the where clause for filtering
                const whereClause = {};
                if (username) {
                    whereClause.username = { [Op.like]: `%${username}%` };
                }
                if (role) {
                    whereClause.role = role;
                }

                // Calculate offset for pagination
                const offset = (page - 1) * limit;

                // Fetch users with pagination and filtering
                const { count, rows } = await this.#model.findAndCountAll({
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    },
                    where: whereClause,
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                });

                // Send response
                res.status(StatusCodes.OK).json({
                    success: true,
                    message: UserMsg.USER_LIST_FETCHED,
                    users: rows,
                    total: count,
                    page: parseInt(page),
                    pages: Math.ceil(count / limit),
                });

            } catch (error) {
                next(error);
            }
        }
        async getUser(req, res, next) {
            try {
                const { id } = req.params
                const user = await this.#model.findByPk(id, {
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }) || (() => {
                    throw new createHttpError.NotFound(UserMsg.USER_NOT_FOUND);
                })();

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: UserMsg.USER_FETCHED,
                    user
                })

            } catch (error) {
                next(error)
            }
        }

        async updateUser(req, res, next) {
            try {
                const { id } = req.params;
                const { username, password } = req.body;
                const user = await this.#model.findByPk(id, {
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }) || (() => {
                    throw new createHttpError.NotFound(UserMsg.USER_NOT_FOUND);
                })();

                user.username = username ? username : user.username;
                user.password = password ? password : user.password;
                user = await user.save();

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: UserMsg.USER_UPDATED,
                    user
                });
            } catch (error) {
                next(error);
            }
        }

        async deleteUser(req, res, next) {
            try {
                const { id } = req.params;
                const user = await this.#model.findByPk(id, {
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                }) || (() => {
                    throw new createHttpError.NotFound(UserMsg.USER_NOT_FOUND);
                })();
                await user.destroy();

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: UserMsg.USER_DELETED
                });
            } catch (error) {
                next(error);
            }
        }
    }
    return new UserController()
})()