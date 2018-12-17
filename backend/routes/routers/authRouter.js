var express = require('express');
var defineRoutes = require('../routes/authRoutes');

var authRouter = express.Router();

module.exports = defineRoutes(authRouter);
