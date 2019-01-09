import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize';


export const Shift = sequelize.define('Shift', {
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
}, { schema: 'HumanResources', freezeTableName: true, timestamps: false, })
