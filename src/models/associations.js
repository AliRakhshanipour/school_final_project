import { Student } from './student.model.js';
import { FamilyInfo } from './familyInfo.model.js';
import { EducationInfo } from './educationInfo.model.js';

export function associateModels(models) {
    Student.associate(models);
    FamilyInfo.associate(models);
    EducationInfo.associate(models)

}

