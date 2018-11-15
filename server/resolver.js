const { Recipe } = require('./models/recipe.model');
const { Material } = require('./models/material.model');
const { DateTime, URL } = require('@okgrow/graphql-scalars');
const resolverMap = {
  DateTime,
  URL,
  Query: {
    appName() {
      return 'I love cooking!';
    },
    recipes() {
      return Recipe.find({});
    },
    recipe(obj, args) {
      return Recipe.findById(args.id);
    },
    materials() {
      return Material.find({});
    },
    material(obj, args) {
      return Material.findById(args.id);
    }
  },
  Mutation: {
    // recipe
    addRecipe() {},
    updateRecipe() {},
    deleteRecipe() {},
    // materials
    addMaterial() {},
    updateMaterial() {},
    deleteMaterial() {}
  },
  Recipe: {
    materials: recipe => {
      let result = [];
      let materials = recipe.materials;
      materials.forEach(materialId => {
        result.push(Material.findById(materialId));
      });
      return result;
    }
  },
  Material: {
    recipes: material => {
      let result = [];
      let recipes = material.recipes;
      recipes.forEach(recipeId => {
        result.push(Recipe.findById(recipeId));
      });
      return result;
    }
  }
};

exports.resolvers = resolverMap;
