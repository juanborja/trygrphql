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
  
             return links.find(element => { 
                return element.id == args.id; 
              });         
            
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
        deleteLink: (parent, args) => {
            links.splice(
                element =>{
                    return element.id == args.id
                }
            ,1);
        },
        updateLink:(parent,args) => {
  
            return links.find(element => { 
               if (element.id == args.id){
                   element.description = args.description;
                   return element;
               }
             });         
           
       }
        

    },
   /* Link:{
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }*/
}

const server = new GraphQLServer({
    typeDefs:'schema.graphql', 
    resolvers
})
server.start(()=> console.log('Server running on http://localhost:4000'))