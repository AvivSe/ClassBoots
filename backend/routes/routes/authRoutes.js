const express = require('express');
let User = require('../../models/user');
const mongoose = require('mongoose');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});

//TODO: need to move the connection to secret config file

const aws = require('aws-sdk');

mongoose.connect("mongodb://site:QqQq!1!1@ds117164.mlab.com:17164/classboots")
//mongoose.connect("mongodb://"+ process.env.DB_USER_CONNECT +":"+ process.env.DB_PASS_CONNECT +"@ds117164.mlab.com:17164/classboots")
    .then(() => {
        console.log('Connected to the database!');
    }).catch(reason => {
    console.log(reason);
});


var defineRoutes = router =>{
    router.post('/login', (req,res)=>{
        User.findOne({ email: req.body.email }).then(user => res.status(200).send(user).catch(err => res.status(400).send("Not exists " + err)));
    });

    return router;
};

module.exports = defineRoutes;
