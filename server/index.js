const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { join } = require('path');
const { resolvers } = require('./resolver');
const mongoose = require('./mongoose');

const schemaDir = join(process.cwd(), 'schemas');
const typeDefs = readFileSync(join(schemaDir, 'schema.graphqls'), 'utf-8');

mongoose.connect(
  mongoose.get('db_url'),
  { useNewUrlParser: true }
);

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
