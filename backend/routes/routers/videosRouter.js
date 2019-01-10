var express = require('express');
var defineRoutes = require('../routes/videosRoutes');

var videosRouter = express.Router();


module.exports = defineRoutes(videosRouter);
