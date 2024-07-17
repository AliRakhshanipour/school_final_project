import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { StatusCodes } from "http-status-codes"

export const StudentService = (() => {
    class StudentService {
        #model
        constructor(params) {
            autoBind(this)
            this.#model = models.Student
        }

        async getCreateStudentForm(req, res, next) {
            try {
                const url = "pages/admin/create-student.ejs"
                res.render(url)
            } catch (error) {
                next(error)
            }
        }

        async changeAcceptionStatus(req, res, next) {
            try {
                const id = req.params.id;
                const { acception_status, accepted_field } = req.body;
                let student = await this.#model.findByPk(id);

                if (!student) {
                    return res.status(404).json({ error: 'Student not found' });
                }

                student.acception_status = acception_status;

                if (accepted_field) {
                    student.accepted_field = accepted_field
                }

                await student.save();
                res.status(StatusCodes.OK).json({
                    success: true,
                    student
                });
            } catch (error) {
                next(error)
            }
        }
    }
    return new StudentService()
})()