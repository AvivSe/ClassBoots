var express = require('express');
var defineRoutes = require('../routes/usersRoutes');
var authRouter = require('./authRouter');

var usersRouter = express.Router();

usersRouter.use('/auth', authRouter);

module.exports = defineRoutes(usersRouter);
