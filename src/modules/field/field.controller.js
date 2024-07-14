import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { StatusCodes } from "http-status-codes"
import { FieldMsg } from "./field.messages.js"
import createHttpError from "http-errors"

export const FieldController = (() => {
    class FieldController {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.Field
        }

        async createField(req, res, next) {
            try {
                const fieldData = req.body
                const field = await this.#model.create(fieldData)
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: FieldMsg.FIELD_CREATED,
                    field
                })
            } catch (error) {
                next(error)
            }
        }


        async getField(req, res, next) {
            try {
                const { id } = req.params
                const field = await this.#model.findByPk(id) || (() => {
                    throw new createHttpError.NotFound(FieldMsg.FIELD_NOT_FOUND)
                })()
                res.status(StatusCodes.OK).json({
                    success: true,
                    message: FieldMsg.FIELD_FETCHED,
                    field
                })
            } catch (error) {
                next(error)
            }
        }


        async getFieldList(req, res, next) {
            try {
                const fields = await this.#model.findAll({
                    include: [{
                        model: models.Image,
                        attributes: ["url"]
                    }]
                })

                console.log(fields);
                res.render('pages/fields.ejs', { fields })
                // res.status(StatusCodes.OK).json({
                //     success: true,
                //     message: FieldMsg.FIELD_LIST_FETCHED,
                //     fields
                // })
            } catch (error) {
                next(error)
            }
        }


        async updateField(req, res, next) {
            try {
                const { id } = req.params
                const fieldData = req.body
                const field = await this.#model.findByPk(id) || (() => {
                    throw new createHttpError.NotFound(FieldMsg.FIELD_NOT_FOUND)
                })()

                await field.update(fieldData)
                res.status(StatusCodes.OK).json({
                    success: true,
                    message: FieldMsg.FIELD_UPDATED,
                    field
                })
            } catch (error) {
                next(error)
            }
        }


        async deleteField(req, res, next) {
            try {
                const { id } = req.params
                const field = await this.#model.findByPk(id) || (() => {
                    throw new createHttpError.NotFound(FieldMsg.FIELD_NOT_FOUND)
                })()
                await field.destroy()
                res.status(StatusCodes.OK).json({
                    success: true,
                    message: FieldMsg.FIELD_DELETED,
                })
            } catch (error) {
                next(error)
            }
        }
    }
    return new FieldController()
})()