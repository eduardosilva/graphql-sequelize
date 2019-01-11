import * as express from 'express'
import * as bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { schema } from './graphql/Schema'
import { EmployeeInstance } from './infrastructure/database/models/Employee';
import db from './infrastructure/database/DbContext';


// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress(
  {
    schema,
    context: {
      userName: 'Eduardo Silva',
      db: db
    }
  }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
  mko()

});

const mko = async () => {
  db.Employee.findAll({
    include: [{
      model: db.Person,
      as: 'person'
    },
    {
      model: db.EmployeeDepartmentHistory,
      as: 'departmentHistory'
    }]
  }).then((r: EmployeeInstance[]) => {
    r.map(t => console.log('name: ' + t.person.firstName + 'departments: ' + t.departmentHistory.length))
  })
}
