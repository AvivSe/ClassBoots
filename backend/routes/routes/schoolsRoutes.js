const express = require('express');
const SchoolController = require('../../controllers/schoolController');
const InstitutionController = require('../../controllers/institutionController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router => {

    router.get('/:id/cms', async (req,res)=> {
        let result={};
        if(!req.params.id)
            result= {error:true,description:'you do\'nt have validation'};
        else
             result = await SchoolController.cms(req.params.id);
        res.status(result.error?400:200).send(result);
    });

    router.get('/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SchoolController.getSchool(req.params.id);
        res.status(result.error?400:200).send(result);
    });

    router.post('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body.institutionid || !req.body.name) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            var send = {};
            send.institutionid = req.body.institutionid;
            result = await SchoolController.createSchool(req.body);
            if (!result.error) {
                send.schoolid = result._id;
                InstitutionController.addSchool(send);
            }
        }
        res.status(result.error?400:201).send(result);
    });

    router.get('', async function (req, res) {
        let result = await SchoolController.getSchoolCollection();
        res.status(result.error?400:200).send(result);
    });

    router.delete('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body._id || !req.body.institutionid)
            result = {error: true, description: 'you don\'t have validation'};
        else {
            result = await SchoolController.deleteSchool(req.body._id);
            if (!result.error)
                InstitutionController.deleteSchool({institutionid: req.body.institutionid, schoolid: req.body._id});
        }
        res.status(result.error?400:200).send(result);
    });

    router.put('', checkAuth, admin, async function (req, res) {
        let result = {};
        if(!req.body._id)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await SchoolController.updateSchool(req.body);
        res.status(result.error?400:200).send(result);
    });

    router.post('/addsubject', checkAuth, admin, async function (req, res) {
        let result = {};
        if(!req.body.schoolid || !req.body.subjectid)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await SchoolController.addSubject(req.body);
        res.status(result.error?400:201).send(result);
    });

    router.get('/getsubjects/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SchoolController.getSubjects(req.params.id);
        res.status(result.error?400:200).send(result);
    });

    router.post('/addpermission', checkAuth, admin, async function (req, res) {
        let result = {};
        if(!req.body.schoolid || !req.body.userid)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await SchoolController.addpermission(req.body);
        res.status(result.error?400:200).send(result);
    });

    router.delete('/permission', checkAuth, admin, async function (req, res) {
        let result = {};
        if(!req.body.schoolid || !req.body.userid)
            result = {error:true,description:'you don\'t have validation'};
        else
            result = await SchoolController.deletepermission(req.body);
        res.status(result.error?400:200).send(result);
    });

    return router;
};

module.exports = defineRoutes;
