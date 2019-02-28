const express = require('express');
const SubjectController = require('../../controllers/subjectController');
const SchoolController = require('../../controllers/schoolController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router => {

    router.get('/:id/cms',checkAuth, admin, async (req,res)=> {
        let result={};
        if(!req.params.id)
            result= {error:true,description:'you do\'nt have validation'};
        else
            result = await SubjectController.cms(req.params.id);
        res.status(result.error?400:200).send(result);
    });

    router.get('/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SubjectController.getSubject(req.params.id);
        res.status(result.error?400:200).send(result);
    });

    router.post('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body.name || !req.body.description || !req.body.schoolid) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            var send = {};
            send.schoolid = req.body.schoolid;
            result = await (SubjectController.createSubject(req.body));
            if (!result.error) {
                send.subjectid = result._id;
                SchoolController.addSubject(send);
            }
        }
        res.status(result.error?400:201).send(result);
    });

    router.get('', async function (req, res) {
        let result = await SubjectController.getSubjectCollection();
        res.status(result.error?400:200).send(result);
    });
    router.delete('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body._id || !req.body.schoolid)
            result = {error: true, description: 'you don\'t have validation'};
        else {
            result = await SubjectController.deleteSubject(req.body._id);
            if (!result.error)
                SchoolController.deleteSubject({schoolid: req.body.schoolid, subjectid: req.body._id});
        }
        res.status(result.error?400:200).send(result);
    });

    router.put('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body._id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SubjectController.updateSubject(req.body);
        res.status(result.error?400:200).send(result);
    });

    router.post('/addLecture', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body.subjectid || !req.body.lectureid)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SubjectController.addLecture(req.body);
        res.status(result.error?400:201).send(result);
    });

    router.get('/getlectures/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SubjectController.getLectures(req.params.id);
        res.status(result.error?400:200).send(result);
    });

    return router;
};

module.exports = defineRoutes;
