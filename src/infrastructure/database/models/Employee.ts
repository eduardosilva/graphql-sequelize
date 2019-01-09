import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize';
import { Person } from './Person';
import { Department } from './Department';
import { Shift } from './Shift';


export const Employee = sequelize.define('Employee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        field: 'BusinessEntityID'
    },
    nationalIDNumber: Sequelize.STRING,
    loginID: Sequelize.STRING,
    organizationNode: Sequelize.STRING,
    organizationLevel: Sequelize.STRING,
    jobTitle: Sequelize.STRING,
}, { schema: 'HumanResources', freezeTableName: true, timestamps: false, })

export const EmployeeDepartmentHistory = sequelize.define('EmployeeDepartmentHistory', {
    employeeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'BusinessEntityID'
    },
    departmentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'DepartmentID'
    },
    shiftID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'ShiftID'
    },
    startDate: {
        type: Sequelize.DATE,
        primaryKey: true,
    },
    endDate: Sequelize.DATE,
    modifiedDate: Sequelize.DATE
}, { schema: 'HumanResources', freezeTableName: true, timestamps: false, })

Employee.hasOne(Person, { as: 'person', foreignKey: 'BusinessEntityId' });
Employee.hasMany(EmployeeDepartmentHistory, { as: 'departmentHistory', foreignKey: { name: 'BusinessEntityID' } })

EmployeeDepartmentHistory.belongsTo(Shift, { as: 'shift', foreignKey: { name: 'ShiftID' } })
EmployeeDepartmentHistory.belongsTo(Department, { as: 'department', foreignKey: { name: 'DepartmentID' } })
EmployeeDepartmentHistory.belongsTo(Employee, { as: 'employee', foreignKey: { name: 'BusinessEntityID' } })