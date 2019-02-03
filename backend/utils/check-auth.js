const jwt = require('jsonwebtoken');

module.exports = (req,res, next)=> {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'todo_edit_this_secret', (err, decoded)=> {
            if(err) {
                res.status(401).send({message: 'Auth-Failed', error: err });
            } else {
                req.profile = decoded;
                next();
            }
        });
    } catch (err) {
        res.status(401).send({message: 'Auth-Failed', error: err });
    }
};