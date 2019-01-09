import * as express from 'express'
import * as bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { schema } from './graphql/Schema'
import { Department } from './infrastructure/database/models/Department';
import { Employee, EmployeeDepartmentHistory } from './infrastructure/database/models/Employee';
import { Person } from './infrastructure/database/models/Person';
import { Shift } from './infrastructure/database/models/Shift';


// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress(
  {
    schema,
    context: {
      userName: 'Eduardo Silva'
    }
  }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');

  // Employee.findAll({
  //   include: [{ model: EmployeeDepartmentHistory, as: 'departmentHistory' }]
  // }).then(e => console.log(JSON.stringify(e))
});
