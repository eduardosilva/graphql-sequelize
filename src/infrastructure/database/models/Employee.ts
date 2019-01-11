import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from './typings/SequelizeAttibutes';
import { PersonAttributes } from './Person';


export interface EmployeeAttributes {
    id: number,
    nationalIDNumber: string,
    loginID: string,
    organizationNode: string,
    organizationLevel: string,
    jobTitle: string,
    person?: PersonAttributes
    departmentHistory?: EmployeeAttributes[]
}

export interface EmployeeInstance extends Sequelize.Instance<EmployeeAttributes>, EmployeeAttributes {

}

export const EmployeeFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<EmployeeInstance, EmployeeAttributes> => {
    const attributes: SequelizeAttributes<EmployeeAttributes> = {
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
    }

    const Employee = sequelize.define<EmployeeInstance, EmployeeAttributes>('Employee', attributes, { schema: 'HumanResources', freezeTableName: true, timestamps: false, });

    Employee.associate = models => {
        Employee.hasOne(models.Person, { as: 'person', foreignKey: 'BusinessEntityId' })
        Employee.hasMany(models.EmployeeDepartmentHistory, { as: 'departmentHistory', foreignKey: { name: 'BusinessEntityID' } })
    }

    return Employee;
};



export interface EmployeeDepartmentHistoryAttributes {
    employeeId: number
    departmentID: number
    shiftID: number
    startDate: Date,
    endDate: Date,
    modifiedDate: Date
}

export interface EmployeeDepartmentHistoryInstance extends Sequelize.Instance<EmployeeDepartmentHistoryAttributes>, EmployeeDepartmentHistoryAttributes {

}

export const EmployeeDepartmentHistoryFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<EmployeeDepartmentHistoryInstance, EmployeeDepartmentHistoryAttributes> => {
    const attributes: SequelizeAttributes<EmployeeDepartmentHistoryAttributes> = {
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
    }

    const EmployeeDepartmentHistory = sequelize.define<EmployeeDepartmentHistoryInstance, EmployeeDepartmentHistoryAttributes>('EmployeeDepartmentHistory', attributes, { schema: 'HumanResources', freezeTableName: true, timestamps: false, });

    EmployeeDepartmentHistory.associate = models => {
        EmployeeDepartmentHistory.belongsTo(models.Shift, { as: 'shift', foreignKey: { name: 'ShiftID' } })
        EmployeeDepartmentHistory.belongsTo(models.Department, { as: 'department', foreignKey: { name: 'DepartmentID' } })
        EmployeeDepartmentHistory.belongsTo(models.Employee, { as: 'employee', foreignKey: { name: 'BusinessEntityID' } })
    }

    return EmployeeDepartmentHistory;
};