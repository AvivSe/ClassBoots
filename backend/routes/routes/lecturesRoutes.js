const express = require('express');
const LectureController = require('../../controllers/lectureController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id',  async function(req,res){
        let result =  await LectureController.getLecture(req.params.id);
        res.status(200).send(result);

    });

    router.post('/add',  async function(req,res){
        let result =  await LectureController.createLecture(req.body);
        res.status(result?201:400).send(result);

    });

    router.get('',  async function(req,res){
        let result =  await LectureController.getLectureCollection(req.body);
        res.status(200).send(result);
    });

    router.delete('',  async function(req,res){
        let result =  await LectureController.deleteLecture(req.body.id);
        res.status(200).send(result);
    });
    return router;
};

module.exports = defineRoutes;
