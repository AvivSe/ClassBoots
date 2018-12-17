const express = require('express');


// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.get('/test',(req,res)=>{
        res.status(200).send("api/auth/test Is Called");
    });

    return router;
};

module.exports = defineRoutes;
