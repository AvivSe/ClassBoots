var express = require('express');
var defineRoutes = require('../routes/subjectsRoutes');

var subjectsRouter = express.Router();


module.exports = defineRoutes(subjectsRouter);
