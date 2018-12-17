var mongoose = require('mongoose');
var School = require('./school');
var User = require('./user');

var institutionSchema = mongoose.Schema({
    name:       { type:String, required:true },
    suffix:     { type:String, required:true },
    address:    { type:String, required:true },
    geolocation:{ type:String, required:true },
    image:      { type:String, required:true },
    permission: [ User ],
    schools:    [ School ]
});

module.exports = mongoose.model('Institution',institutionSchema); // institutions