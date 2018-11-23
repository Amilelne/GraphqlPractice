const { Recipe } = require('../models/recipe.model');
const { Material } = require('../models/material.model');
const resolverMap = {
  Query: {
    recipes: async (obj, args, context, info) => {
      return Recipe.find().forGraphql(info);
    },
    recipe: async (_, { id }, context, info) => {
      return Recipe.findForOp(id, info);
    }
  },
  Mutation: {
    // recipe
    addRecipe: async (_, { data }, context, info) => {
      return Recipe.create(data);
    },
    updateRecipe: async (_, { id, data }, context, info) => {
      let recipe = await Recipe.findForOp(id, info);
      Object.assign(recipe, data);
      return recipe.save();
    },
    deleteRecipe: async (_, { id }, context, info) => {
      let recipe = await Recipe.findForOp(id, info);
      return recipe.remove();
    }
  }
};

module.exports = resolverMap;
