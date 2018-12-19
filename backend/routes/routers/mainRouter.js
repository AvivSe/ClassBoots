var express = require('express');
var defineRoutes = require('../routes/mainRoutes');

var usersRouter = require('./usersRouter');
var institutionsRouter = require('./institutionsRouter');

var mainRouter = express.Router();

mainRouter.use('/user', usersRouter);
mainRouter.use('/institution', institutionsRouter);

module.exports = defineRoutes(mainRouter);

