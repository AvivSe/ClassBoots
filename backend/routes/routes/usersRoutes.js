const express = require('express');
const { createUser,getUserCollection,getUser} = require('../../controllers/userController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{
    // router.get('',(req,res)=>{
    //     User.find()
    //         .then(documents=>{
    //             res.status(200).send(documents);
    //         });
    // });
    //
    // router.get('/:id',(req,res)=>{
    //     User.find({_id: req.params.id})
    //         .then(documents => {
    //             res.send(documents);
    //         }).catch(err => {
    //         console.log(err);
    //     });
    // });


    router.get('/:email',  async function(req,res){
        let result =  await getUser(req.params.email);
        res.status(result.status).send(result.data);

    });

    router.post('',  async function(req,res){
        let result =  await createUser(req.body);
        res.status(result.status).send(result.data);

    });

    router.get('',  async function(req,res){
        let result =  await getUserCollection(req.body);
        res.status(result.status).send(result.data);

    });
    return router;
};

module.exports = defineRoutes;
