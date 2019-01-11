import * as Sequelize from 'sequelize'
import { PersonFactory, PersonInstance, PersonAttributes } from './models/Person'
import {
  EmployeeFactory,
  EmployeeInstance,
  EmployeeAttributes,
  EmployeeDepartmentHistoryFactory,
  EmployeeDepartmentHistoryInstance,
  EmployeeDepartmentHistoryAttributes
} from './models/Employee'
import { DepartmentFactory, DepartmentInstance, DepartmentAttributes } from './models/Department'
import { ShiftFactory, ShiftInstance, ShiftAttributes } from './models/Shift'



export const sequelize = new Sequelize('AdventureWorks2016CTP3', 'sa', 'sa', {
  username: 'sa',
  password: 'sa',
  database: 'AdventureWorks2016CTP3',
  host: 'ITLNB076',
  dialect: 'mssql',
  port: 1433,
  operatorsAliases: false, // Sequelize.Op there's a problem with @types/sequelize adding Sequelize.Op as a operatorAliases
  // logging: true,
  dialectOptions: {
    instanceName: 'SQL2016',
    encrypt: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


export interface DbContext {
  Person: Sequelize.Model<PersonInstance, PersonAttributes>
  Employee: Sequelize.Model<EmployeeInstance, EmployeeAttributes>
  EmployeeDepartmentHistory: Sequelize.Model<EmployeeDepartmentHistoryInstance, EmployeeDepartmentHistoryAttributes>
  Department: Sequelize.Model<DepartmentInstance, DepartmentAttributes>
  Shift: Sequelize.Model<ShiftInstance, ShiftAttributes>
}

const db: DbContext = {
  Person: PersonFactory(sequelize, Sequelize),
  Employee: EmployeeFactory(sequelize, Sequelize),
  Department: DepartmentFactory(sequelize, Sequelize),
  Shift: ShiftFactory(sequelize, Sequelize),
  EmployeeDepartmentHistory: EmployeeDepartmentHistoryFactory(sequelize, Sequelize)
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db