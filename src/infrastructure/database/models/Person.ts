import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize';


export const Person = sequelize.define('Person', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        field: 'BusinessEntityID'
    },
    personType: Sequelize.STRING,
    nameStyle: Sequelize.STRING,
    title: Sequelize.STRING,
    firstName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    lastName: Sequelize.STRING,
}, { schema: 'Person', freezeTableName: true, timestamps: false, })