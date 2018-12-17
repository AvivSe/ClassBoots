const express = require('express');
let User = require('../../models/user');
const mongoose = require('mongoose');

//TODO: need to move the connection to secret config file

const aws = require('aws-sdk');

mongoose.connect("mongodb://site:QqQq!1!1@ds117164.mlab.com:17164/classboots")
//mongoose.connect("mongodb://"+ process.env.DB_USER_CONNECT +":"+ process.env.DB_PASS_CONNECT +"@ds117164.mlab.com:17164/classboots")
    .then(() => {
        console.log('Connected to the database!');
    }).catch(reason => {
    console.log(reason);
});

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{
    router.get('',(req,res)=>{
        User.find()
            .then(documents=>{
                res.status(200).send(documents);
            });
    });

    router.get('/:id',(req,res)=>{
        User.find({_id: req.params.id})
            .then(documents => {
                res.send(documents);
            }).catch(err => {
            console.log(err);
        });
    });

    router.post('',(req,res)=>{
        var user = new User({
            email:req.query.email,
            password:req.query.password
        });
        user.save().then(()=>{
            console.log('saved');
        }).catch(err=>{
            console.log(err)
        });
        res.status(200).send(user);
    });
    return router;
};

module.exports = defineRoutes;
