const express = require('express');
const SearchController = require('../../controllers/searchController');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.post('',  async function(req,res){
        let result =  await SearchController.searchLecture(req.body);
        res.status(result?200:400).send(result);
    });

    return router;
};

module.exports = defineRoutes;
