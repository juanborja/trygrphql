const {GraphQLServer} = require ('graphql-yoga');
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Suscription')
/*const resolvers = { 
    Query: {
        info : () => 'Prueba api con GraphQL',
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
        link : (parent,args) => {
  
             return links.find(element => { 
                return element.id == args.id; 
              });         
            
        }
    },
    Mutation:{
        post: (root, args, context) => {
            return context.prisma.createLink({
              url: args.url,
              description: args.description,
            })
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
    Link:{
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}
*/
const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link
  }
const server = new GraphQLServer({
    typeDefs:'schema.graphql', 
    resolvers,
    context: request => {
        return {
          ...request,
          prisma,
        }
      },
})
server.start(()=> console.log('Server running on http://localhost:4000'))