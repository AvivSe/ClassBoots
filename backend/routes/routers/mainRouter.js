var express = require('express');
var defineRoutes = require('../routes/mainRoutes');

var usersRouter = require('./usersRouter');

var mainRouter = express.Router();

mainRouter.use('/user', usersRouter);

module.exports = defineRoutes(mainRouter);

