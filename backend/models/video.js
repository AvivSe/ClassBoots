const mongoose = require('mongoose');
const Lecture = require('./lecture');

var videoSchema = mongoose.Schema({
    reference:  { type:String, required:true },
    views:      { type:Number, default:0},
    position:   { type:Number, required:true }
});

module.exports = mongoose.model('Video',videoSchema); // videos