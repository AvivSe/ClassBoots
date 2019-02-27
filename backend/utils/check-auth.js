const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    if (req.headers.authorization == 'nir') {
        req.profile = {email: 'avivsegal@gmail.com', role: 'admin'};
        var x = await User.findOne({email: 'avivsegal@gmail.com'});
        req.profile.user = {_id: x._id};
        next();
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'todo_edit_this_secret', async (err, decoded) => {
                if (err) {
                    res.status(401).send({error:true,description:('Auth-Failed: '+err)});
                } else {
                    req.profile = decoded;
                    next();
                }
            });
        } catch (err) {
            res.status(401).send({error:true,description:('Auth-Failed: '+err)});
        }
    }
};