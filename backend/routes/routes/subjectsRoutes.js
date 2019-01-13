const express = require('express');
const SubjectController = require('../../controllers/subjectController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id',  async function(req,res){
        let result =  await SubjectController.getSubject(req.params.id);
        res.status(200).send(result);
    });

    router.post('',  async function(req,res){
        let result =  await SubjectController.createSubject(req.body);
        res.status(result?201:400).send(result);
    });

    router.get('',  async function(req,res){
        let result =  await SubjectController.getLectureSubject(req.body);
        res.status(200).send(result);
    });

    router.delete('',  async function(req,res){
        let result =  await SubjectController.deleteSubject(req.body.id);
        res.status(200).send(result);
    });
    return router;
};

module.exports = defineRoutes;
