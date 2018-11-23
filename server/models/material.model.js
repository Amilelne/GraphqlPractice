const { conf } = require('../config');
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

// Material
schema.pre('remove', async function() {
  const { Recipe } = require('./recipe.model');
  await Recipe.updateMany(
    { materials: this.id },
    { $pull: { materials: this._id } }
  );
});
const name = conf('collections.material');
exports.Material = mongoose.model(name, schema, name);
