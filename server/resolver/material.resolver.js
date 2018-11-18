const { Recipe } = require('../models/recipe.model');
const { Material } = require('../models/material.model');
const resolverMap = {
  Material: {
    recipes: async material => {
      return await Recipe.find({ materials: material.id });
    }
  },
  Query: {
    materials: async () => Material.find(),
    material: async (_, { id }) => Material.findForOp(id)
  },
  Mutation: {
    // materials
    addMaterial: async (_, { data }) => Material.create(data),
    updateMaterial: async (_, { id, data }) => {
      // Update Material
      let material = await Material.findForOp(id);
      Object.assign(material, data);
      return material.save();
    },
    deleteMaterial: async (_, { id }) => {
      let material = await Material.findForOp(id);
      await material.remove();
      return material;
    }
  }
};

module.exports = resolverMap;
