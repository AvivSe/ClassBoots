var express = require('express');
var defineRoutes = require('../routes/schoolsRoutes');

var schoolsRouter = express.Router();


module.exports = defineRoutes(schoolsRouter);
