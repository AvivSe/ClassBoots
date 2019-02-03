
class Role {

    static setPermissions(permissions) {
        return (req, res,next) => {
            if(req.profile.user.role) {
                let userPrivileges = req.profile.user.role;
                let allowed = false;
                if(Array.isArray(userPrivileges)) {
                    for (let i in userPrivileges) {
                        if (permissions.contains(userPrivileges[i])) {
                            next();
                            allowed = true;
                            break;
                        }
                    }
                } else {
                    for(let i in permissions) {
                        if(userPrivileges === permissions[i]) {
                            next();
                            allowed = true;
                            break;
                        }
                    }
                }

                if(!allowed) {
                    res.status(401).send({error:'Auth-Failed: you dont have access to use this request.'});
                }

            } else {
                res.status(401).send({error:'Auth-Failed: can\'t find user privileges'});
            }
        }
    }
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