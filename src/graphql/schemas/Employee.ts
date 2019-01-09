import { Employee } from "../../infrastructure/database/models/Employee";
import gql from "graphql-tag";
import { Person } from "../../infrastructure/database/models/Person";
import * as DataLoader from 'dataloader';
import { Op } from "sequelize";

export const typeDefs = gql`
    extend type Query {
        employees(id: ID): [Employee]
    }
    type Employee { 
        id: ID!
        name: String 
    }
`;

export const getPersonByIds = async (ids: number[]): Promise<any[]> => {
    const result = await Person.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
    return result
};

const personLoader = new DataLoader<number, any[]>(getPersonByIds);

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