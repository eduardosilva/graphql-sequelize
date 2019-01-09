import { authors } from "./Author";
import gql from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        books: [Book]
    }

    type Book 
    { 
        id: ID, 
        title: String, 
        author: Author 
    }
`;

export const resolvers = {
    Query: {
        books: () => books
    },
    Book: {
        author: (book, _, context) => {
            console.log('context: ' + JSON.stringify(context))
            return authors[book.id]
        }
    }
}

// Some fake data
export const books = [
    {
        id: 0,
        title: "Harry Potter and the Sorcerer's stone",
    },
    {
        id: 1,
        title: 'Jurassic Park',
    },
];