const { conf } = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  difficult: {
    type: Number,
    required: true
  },
  materials: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updateDate: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const name = conf('collections.recipe');
exports.recipeSchema = recipeSchema;
exports.Recipe = mongoose.model(name, recipeSchema, name);
