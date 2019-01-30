const mongoose = require('mongoose');
const Lecture = require('./lecture');
const Response = require('./comment');

var videoSchema = mongoose.Schema({
    reference:  { type:String, required:true },
    views:      { type:Number, default:0},
    position:   { type:Number, required:true },
    response: [{type:mongoose.Schema.Types.ObjectId, ref:'Response'}]
});

module.exports = mongoose.model('Video',videoSchema); // videos