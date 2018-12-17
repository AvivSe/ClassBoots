const bcrypt = require('bcrypt')
const express = require('express');
let User = require('../../models/user');
const mongoose = require('mongoose');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var router = express.Router({mergeParams: true});


var defineRoutes = router =>{
    router.post('/login', async (req,res)=>{
        let user = await User.findOne({ email: req.body.email });

        if(!user) {
            return res.status(400).send("Invalid email or password.");
        }


        
        //const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(req.body.password === user.password) {
            return res.status(200).send("Is authorized");
        }

        return res.status(400).send("Invalid email or password.");

    });

    return router;
};

module.exports = defineRoutes;
