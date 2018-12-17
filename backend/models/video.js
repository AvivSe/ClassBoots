var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    reference: { type:String, required:true },
    views:      { type:Number, required:true },
    position:   { type:Number, required:true, unique:true }
});

module.exports = videoSchema; // videos
