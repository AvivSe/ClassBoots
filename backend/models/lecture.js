var mongoose = require('mongoose');
var Video = require('./video');

var lectureSchema = mongoose.Schema({
    lecturer:   { type:String, required:true },
    name:      { type:String, required:true },
    description:{ type:String, required:true },
    date:       { type:Date, required:true },
    videos:     [{type:mongoose.Schema.Types.ObjectId, ref:'Video'}],
    subjectid:   { type:mongoose.Schema.Types.ObjectId, ref:'Subject', required:true }

});


module.exports = mongoose.model('Lecture',lectureSchema); // lectures
