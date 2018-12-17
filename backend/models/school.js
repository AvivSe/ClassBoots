var mongoose = require('mongoose');
var Subject = require('./subject');

var schoolSchema = mongoose.Schema({
    name:       { type:String, required:true },
    subjects:   [{ id: String }]
});

module.exports = mongoose.model('School',schoolSchema); // schools