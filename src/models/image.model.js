import { DataTypes, Model } from "sequelize";

export class Image extends Model {
    static associate(models) {
        Image.belongsTo(models.Field, {
            foreignKey: "field_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })

        Image.belongsTo(models.School, {
            foreignKey: "school_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }
}


export const initImage = (sequelize) => {
    return Image.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: "عنوان عکس نمیتواند خالی بماند"
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        field_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        school_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "Image",
        tableName: "images"
    })
}