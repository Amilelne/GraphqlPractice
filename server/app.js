const { configure } = require('./config');
const express = require('express');

const mongoose = require('./mongoose');

const app = express();

// Get configures form config file
const { server } = configure;
for (const key of Object.keys(server)) {
  app.set(key, server[key]);
}

// Connect to DB
mongoose.connect(
  mongoose.get('db_url'),
  { useNewUrlParser: true }
);

module.exports = app;
