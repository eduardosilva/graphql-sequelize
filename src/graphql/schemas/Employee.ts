import * as DataLoader from 'dataloader';
import gql from "graphql-tag";
import { Op } from "sequelize";
import db, { DbContext } from "../../infrastructure/database/DbContext";

const getPersonByIds = async (ids: number[]): Promise<any[]> => {
    const result = await db.Person.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
    return result
};

export const personLoader = new DataLoader<number, any[]>(getPersonByIds);

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
        employees: async (_, { id }, { db }: { db: DbContext }) => {
            if (id){
                return db.Employee.findAll({
                    where: {
                        id: id
                    }
                })
            }

            return db.Employee.findAll()
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