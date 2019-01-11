import * as DataLoader from 'dataloader';
import gql from "graphql-tag";
import { Op } from "sequelize";
import db, { DbContext } from "../../infrastructure/database/DbContext";


const personLoader = new DataLoader<number, any[]>(async (ids: number[]): Promise<any[]> => {
    const result = await db.Person.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    })
    return result
});

const departmentHistoryLoader = new DataLoader<number, any[]>(async (ids: number[]): Promise<any[]> => {
    const result = await db.EmployeeDepartmentHistory.findAll({
        include: [{
            model: db.Department,
            as: 'department'
        },
        {
            model: db.Shift,
            as: 'shift'
        }],
        where: {
            employeeId: {
                [Op.in]: ids
            },
            endDate: null
        }
    })

    return result
});

export const typeDefs = gql`
    extend type Query {
        employees(id: ID): [Employee]
    }

    type Employee { 
        id: ID!
        name: String 
        department: Department
        shift: Shift
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
        name: async ({ id }: { id: number }) => {
            const person = await personLoader.load(id) as any
            return `${person.firstName} ${person.middleName} ${person.lastName}`
        },
        department: async ({ id }: { id: number }, _, { db }: { db: DbContext }) => {
            const history = await departmentHistoryLoader.load(id) as any
            return history.department
        },
        shift: async ({ id }: { id: number }, _, { db }: { db: DbContext }) => {
            const history = await departmentHistoryLoader.load(id) as any
            return history.shift
        }
    }
}