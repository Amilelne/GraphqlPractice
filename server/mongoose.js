const { configure } = require('./config');
const { omit } = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { mongodb } = configure;
for (const key of Object.keys(mongodb)) {
  mongoose.set(key, mongodb[key]);
}

// plugins
mongoose.plugin(schema => {
  schema.statics.findForOp = async function(id) {
    if (!ObjectId.isValid(id)) throw new Error('Input ID is not a valid ID');
    const item = await this.findById(id);
    if (!item) throw new Error(`Document id '${id}' not exists`);
    return item;
  };
});

// event
mongoose.connection.on('open', () => {
  console.log(`Connected to MongoDB`);
});

mongoose.connection.on('error', () => {
  console.log(`Failed to connect MongoDB`);
  // do something else
  process.exit(-1);
});

module.exports = mongoose;
