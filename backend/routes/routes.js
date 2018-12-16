var express = require('express');
// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});

// we are after /api/
var defineRoutes = router =>{
    router.get('/:id',(req,res)=>{
        res.status(200).send('asdf'+req.params.id);
    });

    return router;
};

module.exports = defineRoutes;
