const { Recipe } = require('../models/recipe.model');
const { Material } = require('../models/material.model');
const resolverMap = {
  Material: {
    recipes: async (material) => {
      return await Recipe.find({ materials: material.id });
    }
  },
  Query: {
    recipes: async (obj, args, context, info) => {
      field =
        args.orderBy && args.orderBy.split('_')[0]
          ? args.orderBy.split('_')[0]
          : 'createDate';
      direct =
        args.orderBy && args.orderBy.split('_')[1]
          ? args.orderBy.split('_')[1].toLowerCase()
          : 'asc';
      limit = args.limit ? args.limit : null;
      skip = args.skip ? args.skip : 0;
      return Recipe.find()
        .skip(skip)
        .limit(limit)
        .sort({ [field]: direct })
        .forGraphql(info);
    },
    recipe: async (_, { id }, context, info) => {
      return Recipe.findForOp(id, info);
    },
    recipeSum: async (_, args, context, info) => {
      return Recipe.estimatedDocumentCount();
    }
  },
  Mutation: {
    // recipe
    addRecipe: async (_, { data }, context, info) => {
      console.log(data);
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
