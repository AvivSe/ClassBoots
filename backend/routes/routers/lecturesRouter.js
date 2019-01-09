var express = require('express');
var defineRoutes = require('../routes/lecturesRoutes');

var lecturesRouter = express.Router();


module.exports = defineRoutes(lecturesRouter);
