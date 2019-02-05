const express = require('express');
const VideoController = require('../../controllers/videoController');
const LectureController = require('../../controllers/lectureController');
const checkAuth = require('../../utils/check-auth');
const Role = require('../../utils/Role');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id' , async function(req,res){
        let result =  await VideoController.getVideo(req.params.id);
        res.status(200).send(result);
    });

    router.post('',  async function(req,res){
        var send = {};
        send.lectureid = req.body.lectureid;
        let result =  await VideoController.createVideo(req.body);
        send.videoid = result._id;
        LectureController.addVideo(send);
        res.status(result?201:400).send(result);
    });

    // TODO: checkAuth, Role.admin,
    router.get('', async function(req,res){
        let result =  await VideoController.getVideoCollection(req.body);
        res.status(200).send(result);
    });

    router.delete('', async function(req,res){
        let result =  await VideoController.deleteVideo(req.body.videoid);
        res.status(200).send(result);
    });

    router.post('/addcomment',  async function(req,res){
        let result =  await VideoController.addComment(req.body);
        res.status(200).send(result);
    });

    router.delete('/deletecomment',  async function(req,res){
        let result =  await VideoController.deleteComment(req.body);
        res.status(200).send(result);
    });
    return router;
};

module.exports = defineRoutes;
