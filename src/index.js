const {GraphQLServer} = require ('graphql-yoga');
let links = [{
    id:'link-0',
    url:'www.howtographql.com',
    description:'Full tutorial for GraphQL'
}]
const typeDefs = `type Query {
    info: String!
    feed: [Link!]!
}
type Link{
    id:ID!
    description: String!
    url: String!
}`;

const resolvers = { 
    Query: {
        info : () => 'Prueba api con GraphQL',
        feed : () => links,

    },
    Link:{
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new GraphQLServer({
    typeDefs, 
    resolvers
})
server.start(()=> console.log('Server running on http://localhost:4000'))