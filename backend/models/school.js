var mongoose = require('mongoose');
var Subject = require('./subject');

var schoolSchema = mongoose.Schema({
    name:       { type:String, required:true },
    subjects:   [ Subject ]
});

module.exports = mongoose.model('School',schoolSchema); // schools