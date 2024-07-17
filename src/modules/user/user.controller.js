import autoBind from "auto-bind"
import { StatusCodes } from "http-status-codes"
import { UserMsg } from "./user.messages.js"
import { Op } from "sequelize"
import createHttpError from "http-errors"
import { models } from "../../models/index.js"

export const UserController = (() => {
    class UserController {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.User
        }

        async createUser(req, res, next) {
            try {
                const { username, password } = req.body
                await this.#model.create({ username, password })
                res.redirect("/admin/user/list")
            } catch (error) {
                next(error)
            }
        }

        async listUser(req, res, next) {
            try {
                const { page = 1, limit = 10, username, role } = req.query;
                const pageInt = parseInt(page, 10);
                const limitInt = parseInt(limit, 10);

                if (isNaN(pageInt) || pageInt < 1) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid page number. Page number must be a positive integer.',
                    });
                }
                if (isNaN(limitInt) || limitInt < 1) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid limit number. Limit must be a positive integer.',
                    });
                }

                const whereClause = {};
                if (username) {
                    whereClause.username = { [Op.like]: `%${username}%` };
                }
                if (role) {
                    whereClause.role = role;
                }


                const offset = (pageInt - 1) * limitInt;
                const { count, rows } = await this.#model.findAndCountAll({
                    attributes: {
                        exclude: ["password", "updatedAt"]
                    },
                    where: whereClause,
                    limit: limitInt,
                    offset: offset,
                });

                // res.status(StatusCodes.OK).json({
                //     success: true,
                //     message: UserMsg.USER_LIST_FETCHED,
                //     users: rows,
                //     total: count,
                //     page: pageInt,
                //     pages: Math.ceil(count / limitInt),
                // });

                res.render('pages/admin/users.ejs', {
                    users: rows,
                    total: count,
                    page: pageInt,
                    pages: Math.ceil(count / limitInt),
                    query: { username, role }
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