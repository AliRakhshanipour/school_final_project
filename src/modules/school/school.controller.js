import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { StatusCodes } from "http-status-codes"
import { SchoolMsg } from "./school.messages.js"
import createHttpError from "http-errors"

export const SchoolControoler = (() => {
    class SchoolControoler {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.School
        }

        async createSchool(req, res, next) {
            try {
                const schoolData = req.body
                const school = await this.#model.create(schoolData)
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: SchoolMsg.SCHOOL_CREATED,
                    school
                })
            } catch (error) {
                next(error)
            }
        }

        async getSchool(req, res, next) {
            try {
                const { id } = req.params
                const school = await this.#model.findByPk(id) || (() => {
                    throw new createHttpError.NotFound(SchoolMsg.SCHOOL_NOT_FOUND)
                })()

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: SchoolMsg.SCHOOL_FETCHED,
                    school
                })
            } catch (error) {
                next(error)
            }
        }


        async updateSchool(req, res, next) {
            try {
                const { id } = req.params
                const schoolData = req.body
                const school = await this.#model.findByPk(id,) || (() => {
                    throw new createHttpError.NotFound(SchoolMsg.SCHOOL_NOT_FOUND);
                })();
                await school.update(schoolData)

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: SchoolMsg.SCHOOL_UPDATED,
                    school
                })
            } catch (error) {
                next(error)
            }
        }


        async deleteSchool(req, res, next) {
            try {
                const { id } = req.params
                const school = await this.#model.findByPk(id,) || (() => {
                    throw new createHttpError.NotFound(SchoolMsg.SCHOOL_NOT_FOUND);
                })();
                await school.destroy()

                res.status(StatusCodes.OK).json({
                    success: true,
                    message: SchoolMsg.SCHOOL_DELETED
                })
            } catch (error) {
                next(error)
            }
        }
    }

    return new SchoolControoler()
})()