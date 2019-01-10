var mongoose = require('mongoose');
var Subject = require('./subject');

var schoolSchema = mongoose.Schema({
    name:       { type:String, required:true },
    subjects:   [{type:mongoose.Schema.Types.ObjectId, ref:'Subject'}],
    permission: [{type:String, ref:'User'}]

});

module.exports = mongoose.model('School',schoolSchema); // schools