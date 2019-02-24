const mongoose = require('mongoose');


var historySchema = mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true, index:true},
    watches:   [{type:mongoose.Schema.Types.ObjectId, ref:'Video'}]
});
historySchema.set('autoIndex', false);

module.exports = mongoose.model('History',historySchema); // histories