
class Role {

    static admin(req, res, next) {
        if(req.profile.user.role && req.profile.user.role==='admin') {
            next();
        } else {
            res.status(401).send({error:'Auth-Failed: only admin can access'});
        }
    }

    static creator(req, res, next) {
        if(req.profile.user.role && (req.profile.user.role === 'admin' || req.profile.user.role === 'creator' )) {
            next();
        } else {
            res.status(401).send({error:'Auth-Failed: only creator can access'});
        }
    }

    static editor(req, res, next) {
        if(req.profile.user.role && (req.profile.user.role === 'admin' || req.profile.user.role === 'editor')) {
            next();
        } else {
            res.status(401).send({error:'Auth-Failed: only editor can access'});
        }
    }
}

module.exports = Role;