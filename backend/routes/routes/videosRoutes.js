const express = require('express');
const VideoController = require('../../controllers/videoController');
const checkAuth = require('../../utils/check-auth');
const Role = require('../../utils/Role');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id', checkAuth , async function(req,res){
        let result =  await VideoController.getVideo(req.params.id);
        res.status(200).send(result);
    });

    router.post('',  async function(req,res){
        let result =  await VideoController.createVideo(req.body);
        res.status(result?201:400).send(result);
    });

    router.get('', checkAuth, Role.admin, async function(req,res){
        let result =  await VideoController.getVideoCollection(req.body);
        res.status(200).send(result);
    });

    router.delete('', checkAuth, async function(req,res){
        let result =  await VideoController.deleteVideo(req.body.id);
        res.status(200).send(result);
    });

    router.post('/test',  async function(req,res){
        let result =  await VideoController.testVideo(req.body.id);
        res.status(200).send(result);
    });
    return router;
};

module.exports = defineRoutes;
