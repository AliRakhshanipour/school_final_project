import { DataTypes, Model } from "sequelize";

export class Rule extends Model { }

export const initRule = (sequelize) => {
    return Rule.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rule_text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Rule",
        tableName: "rules"
    })
}