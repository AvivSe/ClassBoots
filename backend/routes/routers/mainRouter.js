var express = require('express');
var defineRoutes = require('../routes/mainRoutes');
var authRouter = require('./authRouter');
var usersRouter = require('./usersRouter');

var mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', usersRouter);

module.exports = defineRoutes(mainRouter);

