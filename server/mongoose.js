const { configure } = require('./config');
const { omit } = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const graphqlFields = require('graphql-fields');

const { mongodb } = configure;
for (const key of Object.keys(mongodb)) {
  mongoose.set(key, mongodb[key]);
}

// plugins
mongoose.plugin(schema => {
  schema.statics.findForOp = async function(id, info) {
    // Validate id
    if (!ObjectId.isValid(id)) throw new Error('Input ID is not a valid ID');

    // Set fieldsName, populate path and select
    let fieldsName = '';
    let path = '';
    let select = '';
    if (info) {
      const fields = graphqlFields(info);
      for (const key of Object.keys(fields)) {
        if (Object.keys(fields[key]).length === 0) {
          fieldsName += key + ' ';
        } else {
          path = key;
          select = '';
          Object.keys(fields[key]).map(s => (select = select + s + ' '));
        }
      }
    }
    // Find item by id
    const item = await this.findById(id, fieldsName).populate({ path, select });
    // If item doesn't exist
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
