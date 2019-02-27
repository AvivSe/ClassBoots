const express = require('express');
const {VideoController} = require('../../controllers/videoController');
const LectureController = require('../../controllers/lectureController');
const checkAuth = require('../../utils/check-auth');
const Role = require('../../utils/Role');
const Permission = require('../../utils/check-permission');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id', checkAuth, async function(req,res){
        let result =  await VideoController.getVideo(req.params.id,req.profile.user._id);
        res.status(200).send(result);
    });

    router.post('', checkAuth, async function(req,res){
        if (!req.body.lectureid) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            var send = {};
            send.lectureid = req.body.lectureid;
            let result = await VideoController.createVideo(req.body);
            if (!result.error) {
                send.videoid = result._id;
                LectureController.addVideo(send);
            }
        }
        res.status(result ? 201 : 400).send(result);
    });

    // TODO: checkAuth, Role.admin,
    router.get('', checkAuth, async function(req,res){
        let result =  await VideoController.getVideoCollection(req.body);
        res.status(result?200:400).send(result);
    });

    router.delete('', checkAuth, async function(req,res){
        let result =  await VideoController.deleteVideo(req.body._id);
        if(!result.error)
            LectureController.deleteVideo({lectureid:req.body.lectureid,videoid:req.body._id});
        res.status(200).send(result);
    });

    router.put('', checkAuth, async function(req,res){
        let result =  await VideoController.updateVideo(req.body);
        res.status(200).send(result);
    });

    router.post('/addcomment', checkAuth, async function(req,res){
        let result =  await VideoController.addComment(req.body,req.profile.user._id);
        res.status(200).send(result);
    });

    router.delete('/deletecomment', checkAuth, async function(req,res){
        let result =  await VideoController.deleteComment(req.body);
        res.status(200).send(result);
    });

    return router;
};

module.exports = defineRoutes;
