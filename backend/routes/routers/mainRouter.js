var express = require('express');
var defineRoutes = require('../routes/mainRoutes');
var authRouter = require('./authRouter');
var usersRouter = require('./usersRouter');
var institutionsRouter = require('./institutionsRouter');

var mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', usersRouter);
mainRouter.use('/institution', institutionsRouter);

module.exports = defineRoutes(mainRouter);

