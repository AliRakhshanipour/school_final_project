import autoBind from "auto-bind"
import { models } from "../../models/index.js"
import { FieldMsg } from "./field.messages.js"
import path from "path"

export const FieldService = (() => {
    class FieldService {
        #model
        #imageModel
        constructor() {
            autoBind(this)
            this.#model = models.Field
            this.#imageModel = models.Image
        }

        async addImageToField(req, res, next) {
            try {


                if (!req.file) {
                    return res.status(400).send('No file uploaded.');
                }
                const { fieldId } = req.params;
                const { filename, path: filePath } = req.file;

                // Extract the relative path from the full path
                const relativePath = path.relative(process.cwd(), filePath);
                const url = '/' + relativePath.split(path.sep).slice(1).join('/');


                const image = await this.#imageModel.create({
                    title: req.body.title,
                    url,
                    field_id: fieldId
                });

                res.status(201).json({
                    success: true,
                    message: FieldMsg.FIELD_IMAGE_ADDED,
                    image
                });
            } catch (error) {
                next(error)
            }
        }
    }
    return new FieldService()
})()

