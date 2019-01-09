import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize';


export const Department = sequelize.define('Department', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'DepartmentID'
    },
    groupName: Sequelize.STRING,
    modifiedDate: Sequelize.DATE
}, { schema: 'HumanResources', freezeTableName: true, timestamps: false, })