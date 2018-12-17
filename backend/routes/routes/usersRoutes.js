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

    // GET all users
    router.get('',(req,res)=>{
        User.find(true,(err, user) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(user);
        });


        // User.find()
        //     .then(documents=>{
        //         res.status(200).send(documents);
        //     });
    });

    // GET user by id
    router.get('/id/:id',(req,res)=>{
        // User.findById(req.params.id)
        //     .then(documents => {
        //         res.send(documents);
        //     }).catch(err => {
        //     console.log(err);
        // });


        User.findById(req.params.id, (err, user) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(user);
        });

    });

    // GET user by email
    router.get('/email/:email',(req,res)=>{
        // User.findOne({email: req.params.email})
        //     .then(documents => {
        //         res.send(documents);
        //     }).catch(err => {
        //     console.log(err);
        // });

        User.findOne({email:req.params.email}, (err, user) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(user);
        });


    });

    // POST add user
    router.post('',(req,res)=>{
        const user = new User(req.body);
        user.save(err => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(user);
        });

        // var user = new User({
        //     email:req.body.email,
        //     password:req.body.password
        // });
        // user.save().then(()=>{
        //     console.log(req.body.email+' saved');
        // }).catch(err=>{
        //     console.log(err)
        // });
        // res.status(200).send(user);
    });

    // PUT edit user by id
    router.put('/edit/id/:id',(req,res)=>{
        findByIdAndUpdate(req.params.id
            ,req.body
            ,{new: false}
            ,(err, user) => {
                // Handle any possible database errors
                if (err) return res.status(500).send(err);
                res.send(user);
            });
    });

    // PUT edit user by email
    router.put('/edit/email/:email',(req,res)=>{
        findByOneAndUpdate({email:req.params.email}
            ,req.body
            ,{new: false}
            ,(err, user) => {
                // Handle any possible database errors
                if (err) return res.status(500).send(err);
                res.send(user);
            });
    });


    // GET delete user by id
    router.delete('/delete/id/:id',(req,res)=>{

        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "user "+ req.params.id +" successfully deleted",
                id: user._id
            };
            return res.status(200).send(response);
        });

        // User.deleteOne({_id: req.params.id})
        //     .then(()=> {
        //         console.log('id: '+ req.params.id + ' deleted');
        //         res.status(200).send('done');
        //     }).catch(err => {
        //         console.log(err);
        //     });
    });

    // GET delete user by email
    router.delete('/delete/email/:email',(req,res)=>{


        User.findOneAndRemove({email:req.params.email}
            , (err, user) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "user "+ req.params.id +" successfully deleted",
                    id: user._id
                };
                return res.status(200).send(response);
            });


        // User.deleteOne({email: req.params.email})
        //     .then(()=> {
        //         console.log('email: ' + req.params.email + ' deleted');
        //         res.status(200).send('done');
        //     }).catch(err => {
        //         console.log(err);
        //     });
    });

    return router;
};

module.exports = defineRoutes;
