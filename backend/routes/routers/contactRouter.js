var express = require('express');
var defineRoutes = require('../routes/contactRoutes');

var contactRouter = express.Router();

module.exports = defineRoutes(contactRouter);
