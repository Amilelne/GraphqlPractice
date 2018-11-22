const RecipeResolverMap = require('./recipe.resolver');
const MaterialResolverMap = require('./material.resolver');
const { DateTime, URL } = require('@okgrow/graphql-scalars');
const { merge } = require('lodash');
const resolverMap = {
  DateTime,
  URL,
  Query: {
    appName: async (_, args, context, info) => {
      console.log('Query.appName - info : ', JSON.stringify(info));
      return 'I love cooking!';
    }
  }
};

exports.resolvers = merge(resolverMap, RecipeResolverMap, MaterialResolverMap);
