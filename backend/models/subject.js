var mongoose = require('mongoose');
var Lecture = require('./lecture');

var subjectSchema = mongoose.Schema({
    name:       { type:String, required:true },
    description:{ type:String, required:true },
    lectures:   [{ id: String }]
});

module.exports = mongoose.model('Subject',subjectSchema); // subjects