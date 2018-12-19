const express = require('express');
let User = require('../../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//TODO: need to move the connection
mongoose.connect("mongodb://"+ process.env.DB_USER_CONNECT +":"+ process.env.DB_PASS_CONNECT +"@ds117164.mlab.com:17164/classboots",{ useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the database.');
    }).catch(reason => {
    console.log(reason);
});

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    // GET all users
    router.get('',(req,res)=>{
        User.find({},(err, user) => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }
            else res.status(200).send(user);
        });
    });

    // GET user by id
    router.get('/id/:id',(req,res)=>{
        User.findById(req.params.id, (err, user) => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }
            else res.status(200).send(user);
        });
    });

    // GET user by email
    router.get('/email/:email',(req,res)=>{
        User.findOne({email:req.params.email}, (err, user) => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }
            else res.status(200).send(user);
        });
    });

    // POST add user
    router.post('',async (req,res)=>{
        const salt = await bcrypt.genSalt(10);
        req.params.password = await bcrypt.hash(req.params.password,salt);
        const user = new User(req.body);
        user.save(err => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }
            else res.status(201).send(user);
        });
    });

    // PUT edit user by id
    router.put('/edit/id/:id',(req,res)=>{
        User.findByIdAndUpdate(req.params.id
            ,req.body
            ,{new: false}
            ,(err, user) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('ERROR');
                }
                else res.status(200).send(user);
            });
    });

    // PUT edit user by email
    router.put('/edit/email/:email',(req,res)=>{
        User.findByOneAndUpdate({email:req.params.email}
            ,req.body
            ,{new: false}
            ,(err, user) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('ERROR');
                }
                else res.send(user);
            });
    });

    // DELETE user by id
    router.delete('/delete/id/:id',(req,res)=>{
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            } else {
                const response = {
                    message: "user " + req.params.id + " successfully deleted",
                    id: user._id
                    };
                res.status(200).send(response);
            }
        });
    });

    // DELETE user by email
    router.delete('/delete/email/:email',(req,res)=>{
        User.findOneAndRemove({email:req.params.email}
            , (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('ERROR');
                } else {
                    const response = {
                        message: "user "+ req.params.email +" successfully deleted",
                        id: user._id
                    };
                    res.status(200).send(response);
                }
            });
    });

    return router;
};

module.exports = defineRoutes;
