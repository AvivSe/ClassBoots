var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email:      { type:String, required:true, unique:true },
    password:   { type:String, required:true },
    regDate:    { type:Date, default: Date.now },
    rule:       { type:String, default: 'user'},
    firstname:  { type:String},
    lastname:   { type:String},
    BOD:        { type:Date},

});

module.exports = mongoose.model('User',userSchema); // users