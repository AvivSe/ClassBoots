var mongoose = require('mongoose');



var commentSchema = mongoose.Schema({
    user:{type:String, required:true},
    video:{type:String, required:true},
    title:{type:String, required:true},
    content:{type:String, required:true},
    date:{type:String, required:true}

});
module.exports = mongoose.model('Comment',commentSchema); // Comment