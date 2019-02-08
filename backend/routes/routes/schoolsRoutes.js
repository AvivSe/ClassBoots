const express = require('express');
const SchoolController = require('../../controllers/schoolController');
const InstitutionController = require('../../controllers/institutionController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id',  async function(req,res){
        let result =  await SchoolController.getSchool(req.params.id);
        res.status(result?200:400).send(result);
    });

    router.post('',  async function(req,res){
        var send = {};
        send.institutionid = req.body.institutionid;
        let result = await SchoolController.createSchool(req.body);
        send.schoolid = result._id;
        InstitutionController.addSchool(send);
        res.status(result?201:400).send(result);
    });

    router.get('',  async function(req,res){
        let result =  await SchoolController.getSchoolCollection(req.body);
        res.status(result?200:400).send(result);
    });

    router.delete('',  async function(req,res){
        let result =  await SchoolController.deleteSchool(req.body.id);
        res.status(200).send(result);
    });

    router.put('', async function(req,res){
        let result =  await SchoolController.updateSchool(req.body);
        res.status(200).send(result);
    });

    router.post('/addsubject',  async function(req,res){
        let result =  await SchoolController.addSubject(req.body);
        res.status(result?201:400).send(result);
    });

    router.get('/getsubjects/:id',  async function(req,res){
        let result = await SchoolController.getSubjects(req.params.id);
        res.status(result?200:400).send(result);
    });

    router.post('/addpermission',  async function(req,res){
        let result = await SchoolController.addpermission(req.body);
        res.status(result?200:400).send(result);
    });

    router.delete('/permission',  async function(req,res){
        let result = await SchoolController.deletepermission(req.body);
        res.status(result?200:400).send(result);
    });

    return router;
};

module.exports = defineRoutes;
