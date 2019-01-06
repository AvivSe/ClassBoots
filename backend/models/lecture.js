var mongoose = require('mongoose');
var Video = require('./video');

var lectureSchema = mongoose.Schema({
    lecturer:   { type:String, required:true },
    title:      { type:String, required:true },
    description:{ type:String, required:true },
    date:       { type:Date, required:true },
    videos:   [{ _id: ObjectId , ref:'Video' }]

});
module.exports = mongoose.model('Lecture',lectureSchema); // lectures