import * as DataLoader from 'dataloader';
import gql from "graphql-tag";
import { Op } from "sequelize";
import db, { DbContext } from "../../infrastructure/database/DbContext";


export const typeDefs = gql`
    extend type Query {
        shifts(id: ID): [Shift]
    }
    type Shift { 
        id: ID!
        name: String 
    }
`;

export const resolvers = {
    Query: {
        shifts: async (_, { id }, { db }: { db: DbContext }) => {
            if (id){
                return db.Shift.findAll({
                    where: {
                        id: id
                    }
                })
            }

            return db.Shift.findAll()
        }
    }
}