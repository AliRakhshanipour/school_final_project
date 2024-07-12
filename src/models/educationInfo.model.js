import { Model, DataTypes } from "sequelize";

export class EducationInfo extends Model {
    static associate(models) {
        EducationInfo.belongsTo(models.Student, {
            foreignKey: "student_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

}

export function initEducationInfo(sequelize) {
    return EducationInfo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        grade_avg: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "معدل سال نهم نمیتواند خالی بماند"
                }
            }
        },
        math_mark: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "نمره ریاضی سال نهم نمیتواند خالی بماند"
                }
            }
        },
        field_choice_1: {
            type: DataTypes.ENUM,
            values: ["آسانسور", "صنایع چوب", "مکانیک خودرو", "برق صنعتی"],
            allowNull: false,
            validate: {
                notNull: {
                    msg: "اولویت ۱ نمیتواند خالی بماند"
                },
                isIn: {
                    args: [["آسانسور", "صنایع چوب", "مکانیک خودرو", "برق صنعتی"]],
                    msg: "رشته تحصیلی را صحیح انتخاب کنید"
                }
            }
        },
        field_choice_2: {
            type: DataTypes.ENUM,
            values: ["آسانسور", "صنایع چوب", "مکانیک خودرو", "برق صنعتی"],
            allowNull: false,
            validate: {
                notNull: {
                    msg: "اولویت ۲ نمیتواند خالی بماند"
                },
                isIn: {
                    args: [["آسانسور", "صنایع چوب", "مکانیک خودرو", "برق صنعتی"]],
                    msg: "رشته تحصیلی را صحیح انتخاب کنید"
                }
            }
        },
        field_choice_3: {
            type: DataTypes.ENUM,
            values: ["آسانسور", "صنایع چوب", "مکانیک خودرو", "برق صنعتی"],
            allowNull: false,
            validate: {
                notNull: {
                    msg: "اولویت ۳ نمیتواند خالی بماند"
                },
                isIn: {
                    args: [["آسانسور", "صنایع چوب", "مکانیک خودرو", "برق صنعتی"]],
                    msg: "رشته تحصیلی را صحیح انتخاب کنید"
                }
            }
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'EducationInfo',
        tableName: 'education_info',
    });
}


