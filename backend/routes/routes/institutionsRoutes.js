const express = require('express');
let Institution = require('../../models/institution');
const mongoose = require('mongoose');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    // GET all institutions
    router.get('',(req,res)=>{
        institution.find({},(err, institution) => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }            res.status(200).send(institution);
        });
    });

    // GET institution by id
    router.get('/id/:id',(req,res)=>{
        institution.findById(req.params.id, (err, institution) => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }            res.status(200).send(institution);
        });
    });

    // GET institution by name
    router.get('/name/:name',(req,res)=>{
        institution.findOne({name:req.params.name}, (err, institution) => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }            res.status(200).send(institution);
        });
    });

    // POST add institution
    router.post('',async (req,res)=>{
        const institution = new Institution(req.body);
        institution.save(err => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }
            else res.status(201).send(institution);
        });
    });

    // PUT edit institution by id
    router.put('/edit/id/:id',(req,res)=>{
        Institution.findByIdAndUpdate(req.params.id
            ,req.body
            ,{new: false}
            ,(err, institution) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('ERROR');
                }                console.log();
                res.status(200).send(institution);
            });
    });

    // PUT edit institution by name
    router.put('/edit/name/:name',(req,res)=>{
        Institution.findByOneAndUpdate({name:req.params.name}
            ,req.body
            ,{new: false}
            ,(err, institution) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('ERROR');
                }                res.send(institution);
            });
    });

    // Delete institution by id
    router.delete('/delete/id/:id',(req,res)=>{
        Institution.findByIdAndRemove(req.params.id, (err, institution) => {
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }            const response = {
                message: "institution "+ req.params.id +" successfully deleted",
                id: institution._id
            };
            res.status(200).send(response);
        });
    });

    // Delete institution by name
    router.delete('/delete/name/:name',(req,res)=>{
        Institution.findOneAndRemove({name:req.params.name}
            , (err, institution) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('ERROR');
                }                const response = {
                    message: "institution "+ req.params.name +" successfully deleted",
                    id: institution._id
                };
                res.status(200).send(response);
            });
    });

    // GET all users permissions institution by id
    router.delete('/permissions/:id',(req,res)=>{
        Institution.findById(req.params.id,(err, institution)=>{
            if (err) {
                console.log(err);
                res.status(400).send('ERROR');
            }            res.status(200).send(institution.permission);
        });

    });



    return router;
};

module.exports = defineRoutes;
