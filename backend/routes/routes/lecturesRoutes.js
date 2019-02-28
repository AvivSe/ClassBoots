const express = require('express');
const LectureController = require('../../controllers/lectureController');
const SubjectController = require('../../controllers/subjectController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router => {

    router.get('/stats', async function (req, res) {
        let result = await LectureController.stats();
        res.status(result.error?400:200).send(result);
    });

    router.get('/:id/cms', async (req,res)=> {
        let result={};
        if(!req.params.id)
            result= {error:true,description:'you do\'nt have validation'};
        else
         result = await LectureController.cms(req.params.id);
        res.status(result.error?400:200).send(result);
    });

    router.get('/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await LectureController.getLecture(req.params.id);
        res.status(200).send(result);
    });

    router.post('/addplaylist/:id', checkAuth, admin, async function (req, res) {
        var send = {};
        send.msg = "Trying to create new videos from playlist to lecture " + req.params.id;
        send.plID = req.body.plID;
        await LectureController.addYTPlaylistToLectureByYTPLID(req.params.id, req.body.plID);
        let result = send;
        res.status(result.error?400:201).send(result);
    });

    router.post('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body.lecturer || !req.body.name || !req.body.description || !req.body.date || !req.body.subjectid) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            var send = {};
            send.subjectid = req.body.subjectid;
            result = await LectureController.createLecture(req.body);
            if (!result.error) {
                send.lectureid = result._id;
                SubjectController.addLecture(send);
            }
        }
        res.status(result.error?400:201).send(result);
    });

    router.get('', async function (req, res) {
        let result = await LectureController.getLectureCollection();
        res.status(result.error?400:200).send(result);
    });

    router.delete('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body.subjectid || !req.body._id)
            result = {error: true, description: 'you don\'t have validation'};
        else {
            result = await LectureController.deleteLecture(req.body._id);
            if (!result.error)
                SubjectController.deleteLecture({subjectid: req.body.subjectid, lectureid: req.body._id});
        }
        res.status(200).send(result);
    });

    router.put('', checkAuth, admin, async function (req, res) {
        let result = {};
        if(!req.body._id)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await LectureController.updateLecture(req.body);
        res.status(200).send(result);
    });

    router.post('/addVideo', checkAuth, admin, async function (req, res) {
        let result = {};
        if(!req.body.lectureid || !req.body.videoid)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await LectureController.addVideo(req.body);
        res.status(result.error?400:201).send(result);
    });

    router.get('/getvideos/:id', checkAuth, async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await LectureController.getVideos(req.params.id);
        res.status(result.error?400:200).send(result);
    });


    return router;
};

module.exports = defineRoutes;
