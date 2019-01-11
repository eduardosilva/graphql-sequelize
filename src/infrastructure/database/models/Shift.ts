import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from './typings/SequelizeAttibutes';
import db from '../DbContext';

export interface ShiftAttributes {
    id: number
    name: string,
    startTime: Date,
    endTime: Date,
    modifiedDate: Date,
}

export interface ShiftInstance extends Sequelize.Instance<ShiftAttributes>, ShiftAttributes {

}

export const ShiftFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ShiftInstance, ShiftAttributes> => {
    const attributes: SequelizeAttributes<ShiftAttributes> = {
            id: {
                type: Sequelize.SMALLINT,
                autoIncrement: false,
                primaryKey: true,
                field: 'ShiftID'
            },
            name: Sequelize.STRING,
            startTime: Sequelize.TIME,
            endTime: Sequelize.TIME,
            modifiedDate: Sequelize.DATE,
        };

    const Department = sequelize.define<ShiftInstance, ShiftAttributes>('Shift', attributes, { schema: 'HumanResources', freezeTableName: true, timestamps: false, });
    return Department;
};
