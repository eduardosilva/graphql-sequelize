import * as Sequelize from 'sequelize'

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
