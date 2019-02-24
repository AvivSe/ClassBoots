const express = require('express');
const LectureController = require('../../controllers/lectureController');
const SubjectController = require('../../controllers/subjectController');
const checkAuth = require('../../utils/check-auth');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id', checkAuth, async function(req,res){
        let result =  await LectureController.getLecture(req.params.id);
        res.status(200).send(result);
    });

    router.post('', checkAuth, async function(req,res){
        var send = {};
        send.subjectid = req.body.subjectid;
        let result =  await LectureController.createLecture(req.body);
        send.lectureid = result._id;
        SubjectController.addLecture(send);
        res.status(result?201:400).send(result);
    });

    router.get('', checkAuth, async function(req,res){
        let result =  await LectureController.getLectureCollection(req.body);
        res.status(result?200:400).send(result);
    });

    router.delete('', checkAuth, async function(req,res){
        let result =  await LectureController.deleteLecture(req.body.id);
        res.status(200).send(result);
    });

    router.put('', checkAuth, async function(req,res){
        let result =  await LectureController.updateLecture(req.body);
        res.status(200).send(result);
    });

    router.post('/addVideo', checkAuth, async function(req,res){
        let result =  await LectureController.addVideo(req.body);
        res.status(result?201:400).send(result);
    });

    router.get('/getvideos/:id', checkAuth, async function(req,res){
        let result = await LectureController.getVideos(req.params.id);
        res.status(result?200:400).send(result);
    });

    return router;
};

module.exports = defineRoutes;
