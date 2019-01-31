const mongoose = require('mongoose');
const Lecture = require('./lecture');
const Comment = require('./comment');

var videoSchema = mongoose.Schema({
    reference:  { type:String, required:true },
    views:      { type:Number, default:0},
    position:   { type:Number, required:true },
    Comment: [{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]
});

module.exports = mongoose.model('Video',videoSchema); // videos