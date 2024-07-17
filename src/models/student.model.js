import { Model, DataTypes, Sequelize } from "sequelize";

export class Student extends Model {
    static associate(models) {
        Student.hasOne(models.FamilyInfo, {
            foreignKey: "student_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }

    static async createStudentWithFamilyInfo(studentData, familyInfoData, FamilyInfoModel) {
        let transaction;
        try {
            transaction = await this.sequelize.transaction();

            const student = await this.create(studentData, { transaction });
            const studentId = student.id;

            if (familyInfoData) {
                familyInfoData.student_id = studentId;
                await FamilyInfoModel.create(familyInfoData, { transaction });
            }

            await transaction.commit();
            return student;
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
                console.error("Transaction rolled back due to error:", error);
            }
            if (error instanceof Sequelize.ValidationError) {
                throw new Error("Validation Error: " + error.message);
            }
            throw error;
        }
    }

    static async updateStudentWithFamilyInfo(studentId, studentData, familyInfoData, FamilyInfoModel) {
        let transaction;
        try {
            transaction = await this.sequelize.transaction();

            await this.update(studentData, {
                where: { id: studentId },
                transaction
            });

            if (familyInfoData) {
                const familyInfo = await FamilyInfoModel.findOne({ where: { student_id: studentId } });
                if (familyInfo) {
                    await FamilyInfoModel.update(familyInfoData, {
                        where: { student_id: studentId },
                        transaction
                    });
                } else {
                    familyInfoData.student_id = studentId;
                    await FamilyInfoModel.create(familyInfoData, { transaction });
                }
            }

            await transaction.commit();
            return await this.findByPk(studentId);

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
                console.error("Transaction rolled back due to error:", error);
            }
            if (error instanceof Sequelize.ValidationError) {
                throw new Error("Validation Error: " + error.message);
            }
            throw error;
        }
    }

    get fullname() {
        return `${this.first_name} ${this.last_name}`;
    }
}

export function initStudent(sequelize) {
    return Student.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "نام دانش‌آموز نمیتواند خالی بماند"
                },
                notEmpty: {
                    msg: "نام دانش‌آموز نمیتواند خالی بماند"
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "نام خانوادگی دانش‌آموز نمیتواند خالی بماند"
                },
                notEmpty: {
                    msg: "نام خانوادگی دانش‌آموز نمیتواند خالی بماند"
                }
            }
        },
        national_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "کد ملی دانش‌آموز نمیتواند خالی بماند"
                }
            }
        },
        passport_serial: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "شماره شناسنامه دانش‌آموز نمیتواند خالی بماند"
                }
            }
        },
        father_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "نام پدر نمیتواند خالی بماند"
                }
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            validate: {
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: "فرمت شماره همراه را به درستی وارد نمایید"
                }
            }
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        birth_city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "شهر محل تولد دانش‌آموز نمیتواند خالی بماند"
                }
            }
        },
        religion: {
            type: DataTypes.ENUM,
            values: ['شیعه', 'سنی', 'سایر'],
            allowNull: false,
            validate: {
                notNull: {
                    msg: "مذهب نمیتواند خالی بماند"
                },
                isIn: {
                    args: [['شیعه', 'سنی', 'سایر']],
                    msg: "مذهب را به درستی وارد نمایید"
                }
            }
        },
        physical_condition: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        grade_avg: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "انضباط سال نهم نمیتواند خالی بماند"
                }
            }
        },
        sport_activities: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cultural_activities: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        acception_status: {
            type: DataTypes.ENUM,
            values: ['پذیرفته شده', 'رد شده', 'در حال پردازش'],
            defaultValue: 'در حال پردازش',
        },
        accepted_field: {
            type: DataTypes.ENUM,
            values: [
                "مشخص نشده",
                "برق ساختمان",
                "برق صنعتی",
                "تعمیر و نصب آسانسور",
                "نعمیر خودرو",
                "صنایع چوب و مبلمان"
            ],
            defaultValue: "مشخص نشده"
        },
    }, {
        sequelize,
        modelName: "Student",
        tableName: "students",
    });
}
