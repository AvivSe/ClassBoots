const express = require('express');
const InstitutionController = require('../../controllers/institutionController');
const SchoolController = require('../../controllers/schoolController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    // TODO: need to accept all the parameters for all!!!!!
    router.get('/:id',  async function(req,res){
        let result = await InstitutionController.getInstitution(req.params.id);
        res.status(result?200:400).send(result);
    });
    // TODO: need to fix 400/201
    router.post('',  async function(req,res){
        let result =  await InstitutionController.createInstitution(req.body);
        res.status(result?201:400).send(result);
    });

    router.get('',  async function(req,res){
        let result =  await InstitutionController.getInstitutionCollection(req.body);
        res.status(200).send(result);
    });

    router.delete('',  async function(req,res){
        let result =  await InstitutionController.deleteInstitution(req.body.id);
        res.status(200).send(result);
    });

    router.post('/addschool',  async function(req,res){
        let result =  await InstitutionController.addSchool(req.body);
        res.status(result?201:400).send(result);
    });

    router.get('/getschools/:id',  async function(req,res){
        let result = await InstitutionController.getSchools(req.params.id);
        res.status(result?200:400).send(result);
    });

    return router;
};

module.exports = defineRoutes;
