const mongoose = require('mongoose');


var historySchema = mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    watchs:   [{type:mongoose.Schema.Types.ObjectId, ref:'Video'}]
});


module.exports = mongoose.model('History',historySchema); // histories