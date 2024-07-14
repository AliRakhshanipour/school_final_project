import { DataTypes, Model } from "sequelize";

export class Address extends Model {
    static associate(models) {
        Address.belongsTo(models.School, {
            foreignKey: "school_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }
}

export const initAddress = (sequelize) => {
    return Address.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        school_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    }, {
        sequelize,
        modelName: "Address",
        tableName: "addresses"
    })
}