const express = require('express');
const SearchController = require('../../controllers/searchController');
const checkAuth = require('../../utils/check-auth');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    router.post('', async function(req,res){
        let result =  await SearchController.searchLecture(req.body);
        res.status(result?200:400).send(result);
    });

    router.post('/words', async function(req,res){
        let result =  await SearchController.searchcomment(req.body);
        res.status(result?200:400).send(result);
    });

    router.get('/statistic', async function(req,res){
        let result =  await SearchController.getStatistic();
        res.status(result?200:400).send(result);
    });

    return router;
};

module.exports = defineRoutes;
