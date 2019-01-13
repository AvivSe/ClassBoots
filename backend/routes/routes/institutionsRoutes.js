const express = require('express');
const InstitutionController = require('../../controllers/institutionController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:name',  async function(req,res){
        let result =  await InstitutionController.getInstitution(req.params.name);
        res.status(200).send(result);
    });

    router.post('/add',  async function(req,res){
        let result =  await InstitutionController.createInstitution(req.body);
        res.status(result?201:400).send(result);
    });


    router.get('',  async function(req,res){
        let result =  await InstitutionController.getInstitutionCollection(req.body);
        res.status(200).send(result);
    });
    return router;
};

module.exports = defineRoutes;
