var express = require('express');
var defineRoutes = require('../routes/usersRoutes');

var usersRouter = express.Router();

module.exports = defineRoutes(usersRouter);
