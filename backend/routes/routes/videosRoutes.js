const express = require('express');
const VideoController = require('../../controllers/videoController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/:id',  async function(req,res){
        let result =  await VideoController.getVideo(req.params.name);
        res.status(200).send(result);

    });

    router.post('/add',  async function(req,res){
        let result =  await VideoController.createVideo(req.body);
        res.status(result?201:400).send(result);

    });


    router.get('',  async function(req,res){
        let result =  await VideoController.getVideoCollection(req.body);
        res.status(200).send(result);
    });
    return router;
};

module.exports = defineRoutes;
