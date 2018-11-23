const { Recipe } = require('../models/recipe.model');
const { Material } = require('../models/material.model');
const resolverMap = {
  Material: {
    recipes: async material => {
      return await Recipe.find({ materials: material.id });
    }
  },
  Query: {
    materials: async (_, args, context, info) => {
      return Material.find();
    },
    material: async (_, { id }, context, info) => {
      return Material.findForOp(id, info);
    }
  },
  Mutation: {
    // materials
    addMaterial: async (_, { data }) => Material.create(data),
    updateMaterial: async (_, { id, data }, context, info) => {
      // Update Material
      let material = await Material.findForOp(id, info);
      Object.assign(material, data);
      return material.save();
    },
    deleteMaterial: async (_, { id }, context, info) => {
      let material = await Material.findForOp(id, info);
      await material.remove();
      return material;
    }
  }
};

module.exports = resolverMap;
