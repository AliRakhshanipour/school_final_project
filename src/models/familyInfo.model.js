import { Model, DataTypes } from "sequelize";

export class FamilyInfo extends Model {
    static associate(models) {
        // Define associations with other models here if needed
        FamilyInfo.belongsTo(models.Student, {
            foreignKey: "student_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }
}

export function initFamilyInfo(sequelize) {
    return FamilyInfo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        father_education: {
            type: DataTypes.ENUM,
            values: ['زیر دیپلم', 'دیپلم', 'کاردانی', 'لیسانس', 'فوق لیسانس', 'دکتری', 'بقیه'],
            allowNull: false,
            validate: {
                isIn: {
                    args: [['زیر دیپلم', 'دیپلم', 'کاردانی', 'لیسانس', 'فوق لیسانس', 'دکتری', 'بقیه']],
                    msg: "مدرک تحصیلی پدر را به درستی انتخاب کنید"
                }
            }
        },
        mother_education: {
            type: DataTypes.ENUM,
            values: ['زیر دیپلم', 'دیپلم', 'کاردانی', 'لیسانس', 'فوق لیسانس', 'دکتری', 'بقیه'],
            allowNull: false,
            validate: {
                isIn: {
                    args: [['زیر دیپلم', 'دیپلم', 'کاردانی', 'لیسانس', 'فوق لیسانس', 'دکتری', 'بقیه']],
                    msg: "مدرک تحصیلی مادر را به درستی انتخاب کنید"
                }
            }
        },
        father_phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: "فرمت شماره همراه پدر را به درستی وارد نمایید"
                }
            }
        },
        mother_phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: "فرمت شماره همراه مادر را به درستی وارد نمایید"
                }
            }
        },
        student_lives_with: {
            type: DataTypes.ENUM,
            values: ['والدین', 'مادرخوانده و پدر', 'پدرخوانده و مادر', 'پدربزرگ و مادربزرگ', 'بقیه'],
            allowNull: true,
            validate: {
                isIn: {
                    args: [['والدین', 'مادرخوانده و پدر', 'پدرخوانده و مادر', 'پدربزرگ و مادربزرگ', 'بقیه']],
                    msg: "محل اقامت دانش‌آموز را به درستی انتخاب کنید"
                }
            }
        },
        home_address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        home_phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIranianHomePhoneNumber(value) {
                    const regex = /^[0-9]{8,11}$/;

                    if (!regex.test(value)) {
                        throw new Error("فرمت شماره تلفن منزل را به درستی وارد نمایید");
                    }
                }
            }
        },
        emergency_phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: "فرمت شماره همراه اضطراری را به درستی وارد نمایید"
                }
            }
        },
        number_of_family_members: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 // Example default value, adjust as needed
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'FamilyInfo',
        tableName: 'family_info',
    });

}
