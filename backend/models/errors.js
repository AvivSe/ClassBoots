const mongoose = require('mongoose');


var errorSchema = new mongoose.Schema({
    user:       { type:mongoose.Schema.Types.ObjectId, ref:'User'},
    error:      { type:String},
    description:{},
    date:       { type:Date, default: Date.now }
});

module.exports = mongoose.model('Error',errorSchema); // histories