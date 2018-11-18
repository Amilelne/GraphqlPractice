/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/config.js":
/*!**************************!*\
  !*** ./server/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { parse } = __webpack_require__(/*! properties */ \"properties\");\nconst { join } = __webpack_require__(/*! path */ \"path\");\nconst { readFileSync } = __webpack_require__(/*! fs */ \"fs\");\nconst { has, get } = __webpack_require__(/*! lodash */ \"lodash\");\n\nconst confDir = join(process.cwd(), 'config');\n\nconst defaultFile = readFileSync(join(confDir, 'default.conf'), 'utf-8');\nlet configure = parse(defaultFile, { sections: true });\n\nmodule.exports = {\n  configure,\n  conf: path => {\n    if (!has(configure, path)) throw new Error(`config ${path} is missing!`);\n    else return get(configure, path);\n  }\n};\n\n\n//# sourceURL=webpack:///./server/config.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { ApolloServer, gql } = __webpack_require__(/*! apollo-server */ \"apollo-server\");\nconst { readFileSync } = __webpack_require__(/*! fs */ \"fs\");\nconst { join } = __webpack_require__(/*! path */ \"path\");\nconst { resolvers } = __webpack_require__(/*! ./resolver */ \"./server/resolver.js\");\nconst mongoose = __webpack_require__(/*! ./mongoose */ \"./server/mongoose.js\");\n\nconst schemaDir = join(process.cwd(), 'schemas');\nconst typeDefs = readFileSync(join(schemaDir, 'schema.graphqls'), 'utf-8');\n\nmongoose.connect(\n  mongoose.get('db_url'),\n  { useNewUrlParser: true }\n);\n\nconst server = new ApolloServer({ typeDefs, resolvers });\n\nserver.listen().then(({ url }) => {\n  console.log(`Server ready at ${url}`);\n});\n\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./server/models/material.model.js":
/*!*****************************************!*\
  !*** ./server/models/material.model.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { conf } = __webpack_require__(/*! ../config */ \"./server/config.js\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst materialSchema = new Schema(\n  {\n    name: {\n      type: String,\n      required: true\n    },\n    recipes: {\n      type: [Schema.Types.ObjectId],\n      required: false\n    }\n  },\n  {\n    versionKey: false\n  }\n);\n\nconst name = conf('collections.material');\nexports.materialSchema = materialSchema;\nexports.Material = mongoose.model(name, materialSchema, name);\n\n\n//# sourceURL=webpack:///./server/models/material.model.js?");

/***/ }),

/***/ "./server/models/recipe.model.js":
/*!***************************************!*\
  !*** ./server/models/recipe.model.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { conf } = __webpack_require__(/*! ../config */ \"./server/config.js\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst recipeSchema = new Schema(\n  {\n    title: {\n      type: String,\n      required: true,\n      minlength: 6,\n      maxlength: 255\n    },\n    description: {\n      type: String,\n      required: true\n    },\n    image: {\n      type: String,\n      required: true\n    },\n    difficult: {\n      type: Number,\n      required: true\n    },\n    materials: {\n      type: [Schema.Types.ObjectId],\n      required: true\n    },\n    createDate: {\n      type: Date,\n      required: true,\n      default: Date.now()\n    },\n    updateDate: {\n      type: Date,\n      required: true,\n      default: Date.now()\n    }\n  },\n  {\n    versionKey: false\n  }\n);\n\nconst name = conf('collections.recipe');\nexports.recipeSchema = recipeSchema;\nexports.Recipe = mongoose.model(name, recipeSchema, name);\n\n\n//# sourceURL=webpack:///./server/models/recipe.model.js?");

/***/ }),

/***/ "./server/mongoose.js":
/*!****************************!*\
  !*** ./server/mongoose.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { configure } = __webpack_require__(/*! ./config */ \"./server/config.js\");\nconst { omit } = __webpack_require__(/*! lodash */ \"lodash\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst { mongodb } = configure;\nfor (const key of Object.keys(mongodb)) {\n  mongoose.set(key, mongodb[key]);\n}\n\n// event\nmongoose.connection.on('open', () => {\n  console.log(`Connected to MongoDB`);\n});\n\nmongoose.connection.on('error', () => {\n  console.log(`Failed to connect MongoDB`);\n  // do something else\n  process.exit(-1);\n});\n\nmodule.exports = mongoose;\n\n\n//# sourceURL=webpack:///./server/mongoose.js?");

/***/ }),

/***/ "./server/resolver.js":
/*!****************************!*\
  !*** ./server/resolver.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { Recipe } = __webpack_require__(/*! ./models/recipe.model */ \"./server/models/recipe.model.js\");\nconst { Material } = __webpack_require__(/*! ./models/material.model */ \"./server/models/material.model.js\");\nconst { DateTime, URL } = __webpack_require__(/*! @okgrow/graphql-scalars */ \"@okgrow/graphql-scalars\");\nconst resolverMap = {\n  DateTime,\n  URL,\n  Query: {\n    appName() {\n      return 'I love cooking!';\n    },\n    recipes() {\n      return Recipe.find({});\n    },\n    recipe(obj, args) {\n      return Recipe.findById(args.id);\n    },\n    materials() {\n      return Material.find({});\n    },\n    material(obj, args) {\n      return Material.findById(args.id);\n    }\n  },\n  Mutation: {\n    // recipe\n    addRecipe: (_, args) => {\n      // Create new recipe\n      return Recipe.create(args.data).then(recipe => {\n        // Add new recipe to Material\n        let materials = recipe.materials;\n        materials.forEach(materialId => {\n          Material.findById(materialId, function(err, doc) {\n            doc.recipes.push(recipe.id);\n            doc.save();\n          });\n        });\n        // Search for updated recipe\n        return Recipe.findById(recipe.id);\n      });\n    },\n    updateRecipe: (_, args) => {\n      let newMaterials = args.data.materials;\n      if (newMaterials) {\n        Recipe.findById(args.id, function(err, doc) {\n          let oldMaterials = doc.materials;\n          // Add new material, update the recipes in Material\n          newMaterials.forEach(newMaterialId => {\n            if (oldMaterials.indexOf(newMaterialId) == -1) {\n              Material.findById(newMaterialId, function(err, doc) {\n                doc.recipes.push(args.id);\n                doc.save();\n              });\n            }\n          });\n          // Delete old material, update the recipes in Material\n          oldMaterials.forEach(oldMaterialId => {\n            if (newMaterials.indexOf(oldMaterialId) == -1) {\n              Material.findById(oldMaterialId, function(err, doc) {\n                let index = doc.recipes.indexOf(args.id);\n                if (index >= 0) {\n                  doc.recipes.splice(index, 1);\n                  doc.save();\n                }\n              });\n            }\n          });\n        });\n      }\n      Recipe.updateOne({ _id: args.id }, args.data, function(err, doc) {\n        if (err) console.log(err);\n      });\n      return Recipe.findById(args.id);\n    },\n    deleteRecipe: (_, args) => {\n      // Firstly, delete the recipe in Material\n      Recipe.findById(args.id, function(err, doc) {\n        if (err) console.log(err);\n        let materials = doc.materials;\n        materials.forEach(materialId => {\n          Material.findById(materialId, function(err, doc) {\n            let index = doc.recipes.indexOf(args.id);\n            doc.recipes.splice(index, 1);\n            doc.save();\n          });\n        });\n      });\n      // Secondly, safely delete the recipe\n      return Recipe.findByIdAndDelete(args.id)\n        .then(doc => {\n          return doc;\n        })\n        .catch(err => {\n          console.log(err);\n        });\n    },\n    // materials\n    addMaterial: (_, args) => {\n      // Create new Material\n      return Material.create(args.data);\n    },\n    updateMaterial: (_, args) => {\n      // Update Material\n      Material.updateOne({ _id: args.id }, args.data);\n      return Material.findById(args.id);\n    },\n    deleteMaterial: async (_, args) => {\n      // Firstly, delete the material in Recipe\n      await Material.findById(args.id, function(err, doc) {\n        let recipes = doc.recipes;\n        recipes.forEach(recipeId => {\n          Recipe.findById(recipeId, function(err, doc) {\n            if (err) console.log(err);\n            let index = doc.materials.indexOf(args.id);\n            doc.materials.splice(index, 1);\n            doc.save();\n          });\n        });\n      });\n      // Secondly, safely delete the material\n      return Material.findByIdAndDelete(args.id)\n        .then(doc => {\n          return doc;\n        })\n        .catch(err => {\n          console.log(err);\n        });\n    }\n  },\n  Recipe: {\n    materials: recipe => {\n      let result = [];\n      let materials = recipe.materials;\n      materials.forEach(materialId => {\n        result.push(Material.findById(materialId));\n      });\n      return result;\n    }\n  },\n  Material: {\n    recipes: material => {\n      let result = [];\n      let recipes = material.recipes;\n      recipes.forEach(recipeId => {\n        result.push(Recipe.findById(recipeId));\n      });\n      return result;\n    }\n  }\n};\n\nexports.resolvers = resolverMap;\n\n\n//# sourceURL=webpack:///./server/resolver.js?");

/***/ }),

/***/ "@okgrow/graphql-scalars":
/*!******************************************!*\
  !*** external "@okgrow/graphql-scalars" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@okgrow/graphql-scalars\");\n\n//# sourceURL=webpack:///external_%22@okgrow/graphql-scalars%22?");

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server\");\n\n//# sourceURL=webpack:///external_%22apollo-server%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "properties":
/*!*****************************!*\
  !*** external "properties" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"properties\");\n\n//# sourceURL=webpack:///external_%22properties%22?");

/***/ })

/******/ });