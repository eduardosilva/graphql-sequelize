import gql from "graphql-tag";
import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs as Book, resolvers as bookResolvers, books } from './schemas/Book'
import { typeDefs as Author, resolvers as authorResolvers } from './schemas/Author'
import { typeDefs as Employee, resolvers as empolyeeResolvers } from './schemas/Employee'
import { typeDefs as Department, resolvers as departmentResolvers } from './schemas/Department'
import { typeDefs as Shift, resolvers as shiftResolvers } from './schemas/Shift'
import { merge } from 'lodash'

const Query = gql`
    type Query { 
        _empty: String
    }
  `;

export const schema = makeExecutableSchema({
    typeDefs: [Query, Book, Author, Employee, Department, Shift],
    resolvers: merge(bookResolvers, authorResolvers, empolyeeResolvers, departmentResolvers, shiftResolvers)
});