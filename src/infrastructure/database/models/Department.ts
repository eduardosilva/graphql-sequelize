import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from './typings/SequelizeAttibutes';
import db from '../DbContext';

export interface DepartmentAttributes {
    id: number
    groupName: string,
    modifiedDate: Date
}

export interface DepartmentInstance extends Sequelize.Instance<DepartmentAttributes>, DepartmentAttributes {

}

export const DepartmentFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<DepartmentInstance, DepartmentAttributes> => {
    const attributes: SequelizeAttributes<DepartmentAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'DepartmentID'
        },
        groupName: Sequelize.STRING,
        modifiedDate: Sequelize.DATE
    };

    const Department = sequelize.define<DepartmentInstance, DepartmentAttributes>('Department', attributes, { schema: 'HumanResources', freezeTableName: true, timestamps: false, });
    return Department;
};