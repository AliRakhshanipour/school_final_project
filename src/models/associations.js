import { Student } from './student.model.js';
import { FamilyInfo } from './familyInfo.model.js';
import { EducationInfo } from './educationInfo.model.js';
import { Address } from './address.model.js';
import { School } from './school.model.js';
import { Image } from './image.model.js';
import { Field } from './field.model.js';

export function associateModels(models) {
    Student.associate(models);
    FamilyInfo.associate(models);
    EducationInfo.associate(models)
    Address.associate(models);
    School.associate(models);
    Image.associate(models);
    Field.associate(models)
}