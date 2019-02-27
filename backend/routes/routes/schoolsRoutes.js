const express = require('express');
const SchoolController = require('../../controllers/schoolController');
const InstitutionController = require('../../controllers/institutionController');
const checkAuth = require('../../utils/check-auth');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id/cms', async (req,res)=> {
        let result = await SchoolController.cms(req.params.id);
        res.status(result?200:400).send(result);
    });

    router.get('/:id', async function(req,res){
        let result =  await SchoolController.getSchool(req.params.id);
        res.status(result?200:400).send(result);
    });

    router.post('', checkAuth, async function(req,res){
        if(!req.body.institutionid) {
            result = {error: true, description: 'you don\'t have validation'};
        }else {
            var send = {};
            send.institutionid = req.body.institutionid;
            let result = await SchoolController.createSchool(req.body);
            if (!result.error) {
                send.schoolid = result._id;
                InstitutionController.addSchool(send);
            }
        }
        res.status(result?201:400).send(result);
    });

    router.get('', async function(req,res){
        let result =  await SchoolController.getSchoolCollection(req.body);
        res.status(result?200:400).send(result);
    });

    router.delete('', checkAuth, async function(req,res){
        let result =  await SchoolController.deleteSchool(req.body._id);
        if(!result.error)
            InstitutionController.deleteSchool({institutionid:req.body.institutionid,schoolid:req.body._id});
        res.status(200).send(result);
    });

    router.put('', checkAuth, async function(req,res){
        let result =  await SchoolController.updateSchool(req.body);
        res.status(200).send(result);
    });

    router.post('/addsubject', checkAuth, async function(req,res){
        let result =  await SchoolController.addSubject(req.body);
        res.status(result?201:400).send(result);
    });

    router.get('/getsubjects/:id', async function(req,res){
        let result = await SchoolController.getSubjects(req.params.id);
        res.status(result?200:400).send(result);
    });

    router.post('/addpermission', checkAuth, async function(req,res){
        let result = await SchoolController.addpermission(req.body);
        res.status(result?200:400).send(result);
    });

    router.delete('/permission', checkAuth, async function(req,res){
        let result = await SchoolController.deletepermission(req.body);
        res.status(result?200:400).send(result);
    });

    return router;
};

module.exports = defineRoutes;
