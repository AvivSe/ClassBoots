const express = require('express');
const UserController = require('../../controllers/userController');
const checkAuth = require('../../utils/check-auth');
const Role = require('../../utils/Role');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/profile', checkAuth,  async function(req,res){
        if(req.profile) {
            res.status(200).send(req.profile);
        } else {
            res.status(400).send({error:"true",description: "cannot find profile data"});
        }
    });

    router.get('/history/videos', checkAuth,  async function(req,res){
        if(req.profile) {
            let result = await UserController.getUserWatchesHistory(req.profile.user._id);
            res.status(result?200:400).send(result);
        } else {
            res.status(400).send({error:"true",description: "cannot find profile data"});
        }
    });

    router.get('/:email', checkAuth, Role.admin, async function(req,res){
        let result =  await UserController.getUser(req.params.email);
        res.status(200).send(result);

    });

    router.post('/register',  async function(req,res){
        let result =  await UserController.createUser(req.body);
        res.status(result?201:400).send(result);

    });

    router.post('/login',  async function(req,res){
        if(req.body.email === undefined || req.body.password === undefined)
            res.status(400).send({"ERROR": "Bad Request"});
        else {
            let result = await UserController.login(req.body);
            res.status(200).send(result);
        }

    });

    router.get('' , checkAuth, Role.admin, async function(req,res){
        let result =  await UserController.getUserCollection(req.body);
        res.status(result.status).send(result.data);

    });

    return router;
};

module.exports = defineRoutes;
