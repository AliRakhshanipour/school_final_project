import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {

    getTranslatedRole() {
        const roleTranslations = {
            "admin": "مدیر",
            "user": "کاربر"
        };
        return roleTranslations[this.role] || this.role;
    }
}

export const initUser = (sequelize) => {
    return User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "این نام کاربری قبلا ثبت شده است"
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "رمز عبور نمیتواند خالی بماند"
                }
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ["admin", "user"],
            defaultValue: "user"
        }
    }, {
        sequelize,
        tableName: "users",
        modelName: "User",
        hooks: {
            beforeCreate: async (user) => {
                user.password = await hashPassword(user.password);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await hashPassword(user.password);
                }
            }
        },
        // Add the getter method to the model
        getterMethods: {
            translatedRole() {
                return this.getTranslatedRole();
            }
        }
    });
}

// Helper function to hash the password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};
