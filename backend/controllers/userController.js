let User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const aws = require('aws-sdk');

mongoose.connect("mongodb://site:QqQq!1!1@ds117164.mlab.com:17164/classboots")
//mongoose.connect("mongodb://"+ process.env.DB_USER_CONNECT +":"+ process.env.DB_PASS_CONNECT +"@ds117164.mlab.com:17164/classboots")
    .then(() => {
        console.log('Connected to the database!');
    }).catch(reason => {
    console.log(reason);
});

const getUserCollection = async function(body) {
    let stat = 200;
    var result = '';
    // TODO: error handler
    // TODO: we can use body as filters.
    result = await User.find(err => {
        if(err) {
            stat = 400;
            result = err;
        }
    });

    return { status: stat, data: result};
};

const createUser = async function(body) {
    let stat = 201;
    // TODO: Check body schema
    body.password =  await bcrypt.hash(body.password,await bcrypt.genSalt(10));

    const user = new User(body);

    await user.save(err => {
        if (err) {
            stat = 400;
            body = err;
        }
    });

    return { status: stat, data: body};
};

const getUser = async function(email) {
    //{_id: req.params.id}
    let result;

    await User.findOne({email: email}).then(user => {
        if(!user) {
            result. status = 400;
            result.data = null;
        } else {
            result.status = 200;
            result.data = user;
        }
    }).catch(err=> {
        result.status = 400;
        result.data = err;
    });

    return result;
};
module.exports = { createUser,getUserCollection,getUser };