const {GraphQLServer} = require ('graphql-yoga');
let links = [{
    id:'link-0',
    url:'www.howtographql.com',
    description:'Full tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = { 
    Query: {
        info : () => 'Prueba api con GraphQL',
        feed : () => links,
        link : (parent,args) => {
            var ret=null;
            links.forEach(
                aux =>{                    
                    if(aux.id == args.id) 
                    {
                        ret = aux;
                    }
                }
            );            
            return ret
        }
    },
    Mutation:{
        post: (parent,args) =>{
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
        links.push(link)
        return link
        },
        

    },
   /* Link:{
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }*/
}

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql', 
    resolvers
})
server.start(()=> console.log('Server running on http://localhost:4000'))