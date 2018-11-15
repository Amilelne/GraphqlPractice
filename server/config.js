const { parse } = require('properties');
const { join } = require('path');
const { readFileSync } = require('fs');
const { has, get } = require('lodash');

const confDir = join(process.cwd(), 'config');

const defaultFile = readFileSync(join(confDir, 'default.conf'), 'utf-8');
let configure = parse(defaultFile, { sections: true });

module.exports = {
  configure,
  conf: path => {
    if (!has(configure, path)) throw new Error(`config ${path} is missing!`);
    else return get(configure, path);
  }
};
