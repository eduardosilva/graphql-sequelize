import * as Sequelize from 'sequelize'
import * as DataLoader from 'dataloader';
import { Op } from "sequelize";
import { SequelizeAttributes } from './typings/SequelizeAttibutes';
import db from '../DbContext';

export interface PersonAttributes {
    id?: string;
    personType: string;
    nameStyle: string;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
}

export interface PersonInstance extends Sequelize.Instance<PersonAttributes>, PersonAttributes {

}

export const PersonFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<PersonInstance, PersonAttributes> => {
    const attributes: SequelizeAttributes<PersonAttributes> = {
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
    };

    const Person = sequelize.define<PersonInstance, PersonAttributes>('Person', attributes, { schema: 'Person', freezeTableName: true, timestamps: false, });
    return Person;
};