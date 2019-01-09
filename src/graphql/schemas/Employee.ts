import { Employee } from "../../infrastructure/database/models/Employee";
import gql from "graphql-tag";
import { Person, personLoader } from "../../infrastructure/database/models/Person";

export const typeDefs = gql`
    extend type Query {
        employees(id: ID): [Employee]
    }
    type Employee { 
        id: ID!
        name: String 
    }
`;

export const resolvers = {
    Query: {
        employees: async (_, { id }) => {
            if (id){
                return Employee.findAll({
                    where: {
                        id: id
                    }
                })
            }

            return Employee.findAll()
        }
    },
    Employee: {
        name: async (employee) => {
            const id = employee.id as number
            const person = await personLoader.load(id) as any
            return `${person.firstName} ${person.middleName} ${person.lastName}`
        }
    }
}