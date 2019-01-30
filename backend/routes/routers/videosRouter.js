var express = require('express');
var defineRoutes = require('../routes/videosRoutes');
var commentRouter = require('./commentRouter');

var videosRouter = express.Router();

videosRouter.use('/comment', commentRouter);

module.exports = defineRoutes(videosRouter);
