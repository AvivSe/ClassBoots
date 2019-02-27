const mongoose = require('mongoose');


var watchesSchema = new mongoose.Schema({
    video:{type:mongoose.Schema.Types.ObjectId, ref:'Video',required:true, index:true},
    date:{type:Date, default:Date.now()}
});
watchesSchema.set('autoIndex', false);


var historySchema = mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true, index:true},
    watches:   [watchesSchema]
});
historySchema.set('autoIndex', false);

module.exports = mongoose.model('History',historySchema); // histories