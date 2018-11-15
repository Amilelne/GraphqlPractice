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
    addRecipe: (_, args) => {
      // Create new recipe
      return Recipe.create(args.data).then(recipe => {
        // Add new recipe to Material
        let materials = recipe.materials;
        materials.forEach(materialId => {
          Material.findById(materialId, function(err, doc) {
            doc.recipes.push(recipe.id);
            doc.save();
          });
        });
        // Search for update recipe
        return Recipe.findById(recipe.id);
      });
    },
    updateRecipe: (_, args) => {
      Recipe.update({ id: args.id }, args.data);
      return Recipe.findById(args.id);
    },
    deleteRecipe: (_, args) => {
      console.log(args.id);
      Recipe.deleteOne({ id: args.id }, function(err) {
        if (err) console.log(err);
        else console.log('success');
      });
      return 'success';
    },
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
