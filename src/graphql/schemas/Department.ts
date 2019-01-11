import * as DataLoader from 'dataloader';
import gql from "graphql-tag";
import { Op } from "sequelize";
import db, { DbContext } from "../../infrastructure/database/DbContext";


export const typeDefs = gql`
    extend type Query {
        departments(id: ID): [Department]
    }
    type Department { 
        id: ID!
        name: String 
    }
`;

export const resolvers = {
    Query: {
        departments: async (_, { id }, { db }: { db: DbContext }) => {
            if (id){
                return db.Department.findAll({
                    where: {
                        id: id
                    }
                })
            }

            return db.Department.findAll()
        }
    },
    Department: {
        name: async (department) => {
            return department.groupName
        }
    }
}