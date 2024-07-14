import { DataTypes, Model } from 'sequelize';

export class Field extends Model {
    static associate(models) {
        Field.hasMany(models.Image, {
            foreignKey: "field_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }
}

export const initField = (sequelize) => {
    return Field.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        short_desc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        full_desc: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    }, {
        sequelize,
        modelName: 'Field',
        tableName: 'fields',
    });
}
