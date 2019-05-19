
class Role {
    static admin(req, res, next) {
        if(req.profile.user.role && req.profile.user.role==='admin') {
//            console.log('admin');
            next();
        } else {
            res.status(405).send({error:true,description:'Auth-Failed: only admin can access'});
        }
    }

}

module.exports = Role;