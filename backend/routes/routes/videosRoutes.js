const express = require('express');
const {VideoController} = require('../../controllers/videoController');
const LectureController = require('../../controllers/lectureController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id', checkAuth, async function(req,res){
        let result = {};
        if(!req.params.id)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await VideoController.getVideo(req.params.id,req.profile.user._id);
        res.status(result.error?400:200).send(result);
    });

    router.post('', checkAuth, admin, async function(req,res){
        let result = {};
        if (!req.body.reference || !req.body.position || !req.body.lectureid || !req.body.name) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            var send = {};
            send.lectureid = req.body.lectureid;
            result = await VideoController.createVideo(req.body);
            if (!result.error) {
                send.videoid = result._id;
                LectureController.addVideo(send);
            }
        }
        res.status(result.error?400:201).send(result);
    });

    router.get('', checkAuth, admin, async function(req,res){
        let result =  await VideoController.getVideoCollection();
        res.status(result.error?400:200).send(result);
    });

    router.delete('', checkAuth, admin, async function(req,res){
        let result = {};
        if(!req.body.lectureid || req.body._id)
            result = {error:true,description:'you don\'t have validation'};
        else {
            result = await VideoController.deleteVideo(req.body._id);
            if (!result.error)
                LectureController.deleteVideo({lectureid: req.body.lectureid, videoid: req.body._id});
        }
        res.status(result.error?400:200).send(result);
    });

    router.put('', checkAuth, admin, async function(req,res){
        let result = {};
        if(!req.body._id)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await VideoController.updateVideo(req.body);
        res.status(result.error?400:200).send(result);
    });

    router.post('/addcomment', checkAuth, async function(req,res){
        let result = {};
        if(!req.body.videoid)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await VideoController.addComment(req.body,req.profile.user._id);
        res.status(result.error?400:200).send(result);
    });

    router.delete('/deletecomment', checkAuth, admin, async function(req,res){
        let result = {};
        if(!req.body.videoid || !req.body.commentid)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await VideoController.deleteComment(req.body);
        res.status(result.error?400:200).send(result);
    });

    return router;
};

module.exports = defineRoutes;
