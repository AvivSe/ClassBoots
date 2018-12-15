var express = require('express');
var defineRoutes = require('./routes');
var router = express.Router();

module.exports = defineRoutes(router);

