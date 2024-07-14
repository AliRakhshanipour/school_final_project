import { DataTypes, Model } from "sequelize";

export class School extends Model {
    static associate(models) {
        School.hasOne(models.Address, {
            foreignKey: "school_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })

        School.hasMany(models.Image, {
            foreignKey: "school_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }
}


export const initSchool = (sequelize) => {
    return School.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        principle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        short_desc: {
            type: DataTypes.TEXT,
            allowNull: false
        },

    }, {
        sequelize,
        modelName: "School",
        tableName: "schools"
    })
}