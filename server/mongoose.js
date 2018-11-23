const { configure } = require('./config');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const graphqlFields = require('graphql-fields');

const { mongodb } = configure;
for (const key of Object.keys(mongodb)) {
  mongoose.set(key, mongodb[key]);
}

// plugins query helpers
mongoose.plugin(schema => {
  schema.query.forGraphql = function(info) {
    let fieldsName = [];
    if (info) {
      const fields = graphqlFields(info);
      for (const key of Object.keys(fields)) {
        if (Object.keys(fields[key]).length === 0) {
          fieldsName.push(key);
        } else {
          this.populate({
            path: key,
            select: Object.keys(fields[key]).join(' ')
          });
        }
      }
      return this.select(fieldsName.join(' '));
    }
    return this;
  };
});

// plugins
mongoose.plugin(schema => {
  schema.statics.findForOp = async function(id, info) {
    // Validate id
    if (!ObjectId.isValid(id)) throw new Error('Input ID is not a valid ID');

    // Find item by id
    const item = await this.findById(id).forGraphql(info);
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
