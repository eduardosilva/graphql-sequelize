import gql from 'graphql-tag';

export const typeDefs = gql`
    extend type Query {
        authors: [Author]
    }
    type Author { 
        name: String 
    }
`;

export const resolvers = {
    Query: {
        authors: () => authors
    },
}

export const authors = [{
    name: 'J.K. Rowling'
},
{
    name: 'Michael Crichton'
}]