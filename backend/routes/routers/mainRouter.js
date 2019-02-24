var express = require('express');
var defineRoutes = require('../routes/mainRoutes');

var usersRouter = require('./usersRouter');
var institutionsRouter = require('./institutionsRouter');
var schoolsRouter = require('./schoolsRouter');
var subjetsRouter = require('./subjectsRouter');
var lecturesRouter = require('./lecturesRouter');
var videosRouter = require('./videosRouter');
var SearchRouter = require('./searchRouter');


var mainRouter = express.Router();

mainRouter.use('/user', usersRouter);
mainRouter.use('/institution', institutionsRouter);
mainRouter.use('/school', schoolsRouter);
mainRouter.use('/subject', subjetsRouter);
mainRouter.use('/lecture', lecturesRouter);
mainRouter.use('/video', videosRouter);
mainRouter.use('/search', SearchRouter);

module.exports = defineRoutes(mainRouter);

