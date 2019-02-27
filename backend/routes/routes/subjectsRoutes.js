const express = require('express');
const SubjectController = require('../../controllers/subjectController');
const SchoolController = require('../../controllers/schoolController');
const checkAuth = require('../../utils/check-auth');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id/cms', async (req,res)=> {
        let result = await SubjectController.cms(req.params.id);
        res.status(result?200:400).send(result);
    });

    router.get('/:id', async function(req,res){
        let result =  await SubjectController.getSubject(req.params.id);
        res.status(result?200:400).send(result);
    });

    router.post('', checkAuth, async function(req,res){
        var send = {};
        send.schoolid = req.body.schoolid;
        let result = await (SubjectController.createSubject(req.body));
        send.subjectid = result._id;
        SchoolController.addSubject(send);
        res.status(result?201:400).send(result);
    });

    router.get('', async function(req,res){
        let result =  await SubjectController.getSubjectCollection(req.body);
        res.status(result?200:400).send(result);
    });

    router.delete('', checkAuth, async function(req,res){
        let result =  await SubjectController.deleteSubject(req.body._id);
        res.status(200).send(result);
    });

    router.put('', checkAuth, async function(req,res){
        let result =  await SubjectController.updateSubject(req.body);
        res.status(200).send(result);
    });

    router.post('/addLecture', checkAuth, async function(req,res){
        let result =  await SubjectController.addLecture(req.body);
        res.status(result?201:400).send(result);
    });

    router.get('/getlectures/:id', async function(req,res){
        let result = await SubjectController.getLectures(req.params.id);
        res.status(result?200:400).send(result);
    });

    return router;
};

module.exports = defineRoutes;
