import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize';
import * as DataLoader from 'dataloader';
import { Op } from "sequelize";


const getPersonByIds = async (ids: number[]): Promise<any[]> => {
    const result = await Person.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
    return result
};

export const personLoader = new DataLoader<number, any[]>(getPersonByIds);

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