var express = require('express');
var defineRoutes = require('../routes/commentRoutes');

var commentRouter = express.Router();

module.exports = defineRoutes(commentRouter);
