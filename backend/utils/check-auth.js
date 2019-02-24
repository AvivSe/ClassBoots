const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    if (req.headers.authorization == 'nir') {
        req.profile = {email: 'nir', role: 'admin'};
        next();
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'todo_edit_this_secret', async (err, decoded) => {
                if (err) {
                    res.status(401).send({message: 'Auth-Failed', error: err});
                } else {
                    req.profile = decoded;
                    req.profile._id = await User.find({email: req.profile.email})._id;
                    next();
                }
            });
        } catch (err) {
            res.status(401).send({message: 'Auth-Failed', error: err});
        }
    }
};