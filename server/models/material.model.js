const { conf } = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  recipes: {
    type: [Schema.Types.ObjectId],
    required: false
  }
});

const name = conf('collections.material');
exports.materialSchema = materialSchema;
exports.Material = mongoose.model(name, materialSchema, name);
