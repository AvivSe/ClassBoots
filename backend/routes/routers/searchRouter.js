var express = require('express');
var defineRoutes = require('../routes/searchRoutes');

var searchRouter = express.Router();


module.exports = defineRoutes(searchRouter);
