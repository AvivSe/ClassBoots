var express = require('express');
var defineRoutes = require('../routes/institutionsRoutes');

var institutionsRouter = express.Router();

module.exports = defineRoutes(institutionsRouter);
