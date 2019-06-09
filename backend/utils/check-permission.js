const InstitutionController = require('../controllers/institutionController');
const SchoolController = require('../controllers/schoolController');
const SubjectController = require('../controllers/subjectController');
const LectureController = require('../controllers/lectureController');
const jwt = require("jsonwebtoken");
const { VideoController } = require('../controllers/videoController');


class Permission{
    static async videoCheckPermission(body) {
        var result = await VideoController.getVideo(body.videoid);
        return await result.ERROR === undefined ? await this.lectureCheckPermission({
            lectureid: result.lectureid,
            userid: body.userid
        }) : false;
    };


    static async lectureCheckPermission(body) {
        var result = await LectureController.getLecture(body.lectureid);
        return await result.ERROR === undefined ? await this.subjectCheckPermission({
            subjectid: result.subjectid,
            userid: body.userid
        }) : false;
    };

    static async subjectCheckPermission(body) {
        var result = await SubjectController.getSubject(body.subjectid);
        return await result.ERROR == undefined ? await this.schoolCheckPermission({
            schoolid: result.schoolid,
            userid: body.userid
        }) : false;
    };

    static async schoolCheckPermission(body) {
        var result = await SchoolController.getSchool(body.schoolid);
        if(await result.ERROR === undefined)
        {
            for (let i = 0; i < result.permission.length; i++) {
                if(result.permission[i] === body.userid)
                    return true
            }
            return this.institutionCheckPermission({
                institutionid: result.institutionid,
                userid: body.userid
            });
        }
        return false;
    };

    static async institutionCheckPermission(body) {
        var result = await InstitutionController.getInstitution(body.institutionid);
        if(await result.ERROR === undefined)
        {
            for (let i = 0; i < result.permission.length; i++) {
                if(result.permission[i] === body.userid)
                    return true
            }
        }
        return false;
    };
}

var getProfile  = async(req)=> {
    let result;

    if(!req.headers.authorization) {
        return null;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        await jwt.verify(token, 'todo_edit_this_secret', async (err, decoded) => {
            if (err) {
                result = null;
            } else {
                result = decoded;
            }
        });
    } catch (err) {
        res.status(401).send({error: true, description: ('Auth-Failed: ' + err)});
    }
    return result
};


var videoPermission = async (req, res, next) => {
    req.profile = await getProfile(req);

    if(!req.profile) {
        res.status(200).send({isAuth: false});
    }

    if(req.profile.user.role && req.profile.user.role==='admin')
        next();
    else{
        var body = { userid: req.profile.user._id };
        body.videoid = req.body.videoid?req.body.videoid:req.body._id;
        if(await Permission.videoCheckPermission(body))
            next();
        else
            res.status(300).send({isAuth: false});
    }
};
var lecturePermission = async (req, res, next) => {
    req.profile = await getProfile(req);

    if(!req.profile) {
        res.status(200).send({isAuth: false});
    }

    if(req.profile.user.role && req.profile.user.role==='admin')
        next();
    else{
        var body = { userid: req.profile.user._id };
        body.lectureid = req.body.lectureid?req.body.lectureid:req.body._id;
        if(await Permission.lectureCheckPermission(body))
            next();
        else
            res.status(200).send({isAuth: false});
    }
};
var subjectPermission = async (req, res, next) => {
    req.profile = await getProfile(req);

    if(!req.profile) {
        res.status(200).send({isAuth: false});
    }

    if(req.profile.user.role && req.profile.user.role==='admin')
        next();
    else{
        var body = { userid: req.profile.user._id };
        body.subjectid = req.body.subjectid?req.body.subjectid:req.body._id;
        if(await Permission.subjectCheckPermission(body))
            next();
        else
            res.status(200).send({isAuth: false});
    }
};
var schoolPermission = async (req, res, next) => {
    req.profile = await getProfile(req);

    if(!req.profile) {
        res.status(200).send({isAuth: false});
    }

    if(req.profile.user.role && req.profile.user.role==='admin')
        next();
    else{
        var body = { userid: req.profile.user._id };
        body.schoolid = req.body.schoolid?req.body.schoolid:req.body._id;
        if(await Permission.schoolCheckPermission(body))
            next();
        else
            res.status(200).send({isAuth: false});
    }
};
var institutionPermission = async (req, res, next) => {
    req.profile = await getProfile(req);

    if(!req.profile) {
        res.status(200).send({isAuth: false});
    }

    if(req.profile.user.role && req.profile.user.role==='admin')
        next();
    else{
        var body = { userid: req.profile.user._id };
        body.institutionid = req.body.institutionid?req.body.institutionid:req.body._id;
        if(await Permission.institutionCheckPermission(body))
            next();
        else
            res.status(200).send({isAuth: false});
    }
};


module.exports = {videoPermission,lecturePermission,subjectPermission,schoolPermission,institutionPermission};