import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { StatusCodes } from "http-status-codes"
import { StudentMsg } from "./student.messages.js"
import createHttpError from "http-errors"

export const StudentController = (() => {
    class StudentController {
        #model
        #famliyModel
        constructor() {
            autoBind(this)
            this.#model = models.Student
            this.#famliyModel = models.FamilyInfo
        }

        async createStudent(req, res, next) {
            try {
                const { studentData, familydata } = req.body
                await this.#model.createStudentWithFamilyInfo(studentData, familydata, this.#famliyModel)
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: StudentMsg.STUDENT_CREATED
                })
            } catch (error) {
                next(error)
            }
        }


        async listStudents(req, res, next) {
            try {
                const students = await this.#model.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: this.#famliyModel, attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        },
                    ]
                })
                // res.status(StatusCodes.OK).json({
                //     success: true,
                //     message: StudentMsg.STUDENT_LIST_FETCHED,
                //     students
                // })

                res.render("pages/admin/students.ejs", { students })

            } catch (error) {
                next(error)
            }
        }

        async getStudent(req, res, next) {
            try {
                const { id } = req.params
                const student = await this.#model.findByPk(id, {
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: this.#famliyModel, attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        },
                    ]
                }) || (() => {
                    throw new createHttpError.NotFound(StudentMsg.STUDENT_NOT_FOUND)
                })()

                res.render("pages/admin/student-details.ejs", { student })
            } catch (error) {
                next(error)
            }
        }
    }
    return new StudentController()
})()