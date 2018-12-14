const { conf } = require('../config');
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;
const { Material } = require('./material.model');

const schema = new Schema(
  {
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
      type: String
    },
    difficult: {
      type: Number,
      required: false,
      default: 1,
      min: 1,
      max: 5
    },
    materials: [
      {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'Material'
      }
    ]
  },
  {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

// Middleware
schema.pre('save', async function() {
  if (this.isModified('materials')) {
    const materials = await Material.find({ _id: { $in: this.materials } });
    this.materials = materials.map((m) => m._id);
  }
});
const name = conf('collections.recipe');
exports.Recipe = mongoose.model(name, schema, name);
