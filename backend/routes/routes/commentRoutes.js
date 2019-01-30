const express = require('express');
const CommentController = require('../../controllers/commentController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});

var defineRoutes = router =>{
    router.get('/:id',  async function(req,res){
        let result =  await CommentController.getComment(req.params.id);
        res.status(200).send(result);
    });

    router.post('',  async function(req,res){
        let result =  await CommentController.creatComment(req.body);
        res.status(result?400:201).send(result);
    });


    router.get('',  async function(req,res){
        let result =  await CommentController.getCommentCollection(req.body);
        res.status(200).send(result);
    });

    router.delete('',  async function(req,res){
        let result =  await CommentController.deleteComment(req.body.id);
        res.status(200).send(result);
    });

    router.post('/test',  async function(req,res){
        let result =  await VideoController.testVideo(req.body.id);
        res.status(200).send(result);
    });
    return router;
};

module.exports = defineRoutes;
