const express = require('express');
const InstitutionController = require('../../controllers/institutionController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});

var defineRoutes = router =>{
    router.get('/cms', async (req,res)=> {
        let result = await InstitutionController.totalCms();
        res.status(!result.err?200:400).send(result);
    });
    return router;
};

module.exports = defineRoutes;
