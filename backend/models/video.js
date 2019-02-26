const mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    title:{type:String, required:true},
    content:{type:String, required:true},
    date:{type:Date, default: Date.now}
});
var YTCommentSchema = new mongoose.Schema({
    author:{type:String, required:true},
    content:{type:String, required:true}
});


var videoSchema = mongoose.Schema({
    reference:  { type:String, required:true },
    views:      { type:Number, default:0 },
    position:   { type:Number, required:true },
    comments:   [CommentSchema],
    ytcomment:  [YTCommentSchema],
    lectureid:  { type:mongoose.Schema.Types.ObjectId, ref:'Lecture', required:true },
    lastscrape: { type:Date, default: Date.now },
    name:       {type:String, required:true}
});


module.exports = mongoose.model('Video',videoSchema); // videos