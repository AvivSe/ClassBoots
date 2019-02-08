const School = require('../models/school');
const SubjectController = require('./subjectController');
const InstitutionController = require('./institutionController');
const errorsController = require('./errorsController');


class SchoolController {
    static async getSchoolCollection() {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await School.find(err => {
            if (err) {
                result = invalid;
                errorsController.logger(err,result);
            }
        });
        return result;
    };

    static async createSchool(body) {
        var school = new School(body);
        await school.save((err)=> {
                if (err) {
                    errorsController.logger("Create School",err);
                }
            });
        return school;
    }

    static async getSchool(id) {
        let result = null;
        await School.findById(id).then(school => {
            if (school)
                result = school;
            else
                result = {"ERROR":"school not found"};
        }).catch(err => {
            result = {"ERROR":"school not found"};
            errorsController.logger("Get Subject",err);
        });
        return result;
    };

    static async getSubjects(id) {
        let result = await this.getSchool(id);
        if(result.ERROR)
            return result;
        var mysubjects = [];
        for (let i = 0; i < result.subjects.length; i++) {
            let subject = await SubjectController.getSubject(result.subjects[i]);
            if(subject.ERROR !== undefined)
                this.deleteSubject({schoolid:id,subjectid:result.subjects[i]});
            else mysubjects.push(subject);
        }
        return mysubjects;
    };

    /**
     * delete school and call to remove all subjects of this school
     * @param id of school to be removed.
     * @returns {Promise<*>}
     */
    static async deleteSchool(id) {
        let result = null;
        let obj = await School.findByIdAndDelete(id);
        if(!result)
        {
            obj.subjects.forEach(async subjectId => {
                result = await SubjectController.deleteSubject(subjectId);
                if (result) {
                    console.log(result);
                }
            });
        }
        return result;
    };

    static async updateSchool(body) {
        let result = await School.findByIdAndUpdate(body._id, body, {new: true}, err => {
            if (err) errorsController.logger("update School",err);
        });
        return result;
    }

    static async addSubject(body) {
        var result = await School.findByIdAndUpdate(
            body.schoolid,
            { $push: {"subjects": body.subjectid}},
            { upsert: true, new: true });
        return result;
    };

    static async deleteSubject(body) {
        School.findByIdAndUpdate(
            body.schoolid,
            { $pull: {"subjects": body.subjectid }},
            { upsert: true, new: true },
            err=>{
                if(err) errorsController.logger("Delete Subject from School",err);
            });
    };

    static async addpermission(body) {
        var result = await School.findByIdAndUpdate(
            body.schoolid,
            { $push: {"permission": body.userid}},
            { upsert: true, new: true });
        return result;
    };

    static async deletepermission(body) {
        School.findByIdAndUpdate(
            body.schoolid,
            { $pull: {"permission": body.userid }},
            { upsert: true, new: true },
            err=>{
                if(err) errorsController.logger("Delete user permission from School",err);
            });
    };

    static async checkPermission(body) {
        var result = await this.getSchool(body.schoolid);
        console.log(result);
        if(await result.ERROR !== undefined)
        {
            for (let i = 0; i < result.permission.length; i++) {
                if(result.permission[i] == body.userid)
                    return true
            }
            return InstitutionController.checkPermission({institutionid:result.institutionid,userid:body.userid});
        }
        return false;
    };

}

module.exports = SchoolController;