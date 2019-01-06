var mongoose = require('mongoose');
var Subject = require('./subject');

var schoolSchema = mongoose.Schema({
    name:       { type:String, required:true },
    subjects:   [{ _id: String, ref: 'Subject' }],
    permission:   [{ email : String, ref: 'User' }]
});

module.exports = mongoose.model('School',schoolSchema); // schools