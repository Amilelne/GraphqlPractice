const { Recipe } = require('../models/recipe.model');
const { Material } = require('../models/material.model');
const graphqlFields = require('graphql-fields');
const resolverMap = {
  Query: {
    recipes: async (obj, args, context, info) => {
      const fields = graphqlFields(info);
      let fieldsName = '';
      let path = '';
      let select = '';
      for (const key of Object.keys(fields)) {
        if (Object.keys(fields[key]).length === 0) {
          fieldsName += key + ' ';
        } else {
          path = key;
          select = '';
          Object.keys(fields[key]).map(s => (select = select + s + ' '));
        }
      }
      return Recipe.find({}, fieldsName).populate({ path, select });
    },
    recipe: async (_, { id }, context, info) => {
      return Recipe.findForOp(id, info);
    }
  },
  Mutation: {
    // recipe
    addRecipe: async (_, { data }) => {
      return Recipe.create(data);
    },
    updateRecipe: async (_, { id, data }) => {
      let recipe = await Recipe.findForOp(id);
      Object.assign(recipe, data);
      return recipe.save();
    },
    deleteRecipe: async (_, { id }) => {
      let recipe = await Recipe.findForOp(id);
      return recipe.remove();
    }
  }
};

module.exports = resolverMap;
