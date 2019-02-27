const InstitutionController = require('../controllers/institutionController');
const SchoolController = require('../controllers/schoolController');
const SubjectController = require('../controllers/subjectController');
const LectureController = require('../controllers/lectureController');
const { VideoController } = require('../controllers/videoController');


class Permission{

    static async videoCheckPermission(body) {
        var result = await VideoController.getVideo(body.videoid);
        console.log(result);
        return await result.ERROR === undefined ? await this.lectureCheckPermission({
            lectureid: result.lectureid,
            userid: body.userid
        }) : false;
    };

    static async lectureCheckPermission(body) {
        var result = await LectureController.getLecture(body.lectureid);
        console.log(result);
        return await result.ERROR === undefined ? await this.subjectCheckPermission({
            subjectid: result.subjectid,
            userid: body.userid
        }) : false;
    };

    static async subjectCheckPermission(body) {
        var result = await SubjectController.getSubject(body.subjectid);
        console.log(result);
        return await result.ERROR == undefined ? await this.schoolCheckPermission({
            schoolid: result.schoolid,
            userid: body.userid
        }) : false;
    };

    static async schoolCheckPermission(body) {
        var result = await SchoolController.getSchool(body.schoolid);
        console.log(result);
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
        console.log(result);
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

module.exports = Permission;