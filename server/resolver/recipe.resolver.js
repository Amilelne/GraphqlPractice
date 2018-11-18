const { Recipe } = require('../models/recipe.model');
const { Material } = require('../models/material.model');
const resolverMap = {
  Recipe: {
    materials: async recipe => {
      return Material.find({ _id: { $in: recipe.materials } });
    }
  },
  Query: {
    recipes() {
      return Recipe.find();
    },
    recipe(_, { id }) {
      return Recipe.findForOp(id);
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
