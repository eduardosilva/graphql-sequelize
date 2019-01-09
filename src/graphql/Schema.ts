import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs as Book, resolvers as bookResolvers, books } from './schemas/Book'
import { typeDefs as Author, resolvers as authorResolvers } from './schemas/Author'
import { typeDefs as Employee, resolvers as empolyeeResolvers } from './schemas/Employee'
import { merge } from 'lodash'

const Query = `
    type Query { 
        _empty: String
    }
  `;

export const schema = makeExecutableSchema({
    typeDefs: [Query, Book, Author, Employee],
    resolvers: merge(bookResolvers, authorResolvers, empolyeeResolvers)
});