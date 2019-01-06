const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    email:      { type:String, required:true, unique:true },
    password:   { type:String, required:true },
    regDate:    { type:Date, default: Date.now },
    role:       { type:String, default: 'user'},
    firstName:  { type:String},
    lastName:   { type:String},
    birthday:   { type:Date},
    verified:   { type: Boolean}

});

const validateUser = function(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        // TODO: require password complexity
        password:   Joi.string().min(5).max(255).required(),
        regDate:    Joi.string(),
        role:       Joi.string(),
        firstName:  Joi.string().min(2).max(255),
        lastName:   Joi.string().min(2).max(255),
        birthday:   Joi.date(),
        verified:   Joi.boolean()
    };

    return Joi.validate(user, schema);
};

module.exports = mongoose.model('User',userSchema); // users
