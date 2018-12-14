// const { ApolloServer, gql } = require('apollo-server');
const app = require('./app');
const {
  ApolloServer,
  gql,
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express');
const { readFileSync } = require('fs');
const { join } = require('path');
const { resolvers } = require('./resolver');

const schemaDir = join(process.cwd(), 'schemas');
const typeDefs = readFileSync(join(schemaDir, 'schema.graphqls'), 'utf-8');

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const port = app.get('port');

app.listen({ port }, () => {
  console.log(`Server ready at ${port}`);
});
