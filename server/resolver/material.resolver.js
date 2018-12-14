const { Recipe } = require('../models/recipe.model');
const { Material } = require('../models/material.model');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const resolverMap = {
  Material: {
    recipes: async (material) => {
      return await Recipe.find({ materials: material.id });
    }
  },
  Query: {
    materials: async (_, args, context, info) => {
      field =
        args.orderBy && args.orderBy.split('_')[0]
          ? args.orderBy.split('_')[0]
          : 'createDate';
      direct =
        args.orderBy && args.orderBy.split('_')[1]
          ? args.orderBy.split('_')[1].toLowerCase()
          : 'asc';
      return Material.find()
        .sort({ [field]: direct })
        .forGraphql(info);
      // return Material.find();
    },
    material: async (_, { id }, context, info) => {
      return Material.findForOp(id, info);
    }
  },
  Mutation: {
    // materials
    addMaterial: async (_, { data }) => {
      return Material.create(data).then((result) => {
        pubsub.publish('MATERIAL_ADDED', { materialAdded: result });
        return result;
      });
    },
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
  },
  Subscription: {
    materialAdded: {
      subscribe: () => pubsub.asyncIterator(['MATERIAL_ADDED'])
    }
  }
};

module.exports = resolverMap;
