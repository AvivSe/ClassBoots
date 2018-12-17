var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    refference: { type:String, required:true },
    views:      { type:Number, required:true },
    position:   { type:Number, required:true, unique:true }
});

module.exports = mongoose.model('Video',videoSchema); // videos