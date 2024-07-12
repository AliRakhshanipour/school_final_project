import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { StatusCodes } from "http-status-codes"
import { StudentMsg } from "./student.messages.js"

export const StudentController = (() => {
    class StudentController {
        #model
        #famliyModel
        #educationModel
        constructor() {
            autoBind(this)
            this.#model = models.Student
            this.#famliyModel = models.FamilyInfo
            this.#educationModel = models.EducationInfo
        }

        async createStudent(req, res, next) {
            try {
                const { studentData, familydata, educationData } = req.body
                await this.#model.createStudentWithFamilyInfo(studentData, familydata, educationData, this.#famliyModel, this.#educationModel)
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
                        exclude: ["id", "createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: this.#famliyModel, attributes: {
                                exclude: ["id", "createdAt", "updatedAt"]
                            }
                        },
                        {
                            model: this.#educationModel, attributes: {
                                exclude: ["id", "createdAt", "updatedAt"]
                            }
                        },
                    ]
                })
                res.status(StatusCodes.OK).json({
                    success: true,
                    message: StudentMsg.STUDENT_LIST_FETCHED,
                    students
                })

            } catch (error) {
                next(error)
            }
        }
    }
    return new StudentController()
})()