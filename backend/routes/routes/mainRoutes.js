const express = require('express');


// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});
var defineRoutes = router =>{

    return router;
};

module.exports = defineRoutes;
