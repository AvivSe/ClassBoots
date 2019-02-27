const School = require('../models/school');
const SubjectController = require('./subjectController');
const errorsController = require('./errorsController');
const LectureController = require('./lectureController');



class SchoolController {
    static async getSchoolCollection() {
        var result;
        var invalid = {};
        try {
            result = await School.find(err => {
                if (err) {
                    invalid = {error:true,description:err};
                    errorsController.logger({error:'getSchoolCollection',description:err});
                }
            });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'getSchoolCollection: '+e});
        }
    };

    static async createSchool(body) {
        var result = {};
        var school = new School(body);
        try {
            await school.save((err)=> {
                if (err) {
                    result = {error:true,description:err};
                    errorsController.logger({error:'createInstitution',description:err});
                }
            });
            return result.error===undefined?school:result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'createSchool: '+e});
        }

    }

    static async getSchool(id) {
        let result = null;
        try {
            await School.findById(id).then(school => {
                if (school)
                    result = school;
                else
                    result = {error:true,description:'school not found'};
            }).catch(err => {
                result = {error:true,description:err};
                errorsController.logger({error:'getSchool',description:err});
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'getSchool: '+e});
        }

    };

    static async getSubjects(id) {
        let result = [];
        try {
            await this.getSchool(id).then(async school=>{
                for (let i = 0; i < school.subjects.length; i++) {
                    await SubjectController.getSubject(school.subjects[i]).then(async subject=>{
                        if(subject.error !== undefined)
                            this.deleteSubject({schoolid:id,subjectid:school.subjects[i]});
                        else result.push(subject);
                    });
                }
            }).catch(async err=>{
                result = {error:true,description:'School not found'};
                // TODO: need to fix
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'getSubjects: '+e});
        }

    };

    /**
     * delete school and call to remove all subjects of this school
     * @param id of school to be removed.
     * @returns {Promise<*>}
     */
    static async deleteSchool(id) {
        let result = null;
        try {
            await School.findByIdAndDelete(id).then(obj=>{
                obj.subjects.forEach(async subjectId => {
                    result = await SubjectController.deleteSubject(subjectId);
                });
            }).catch(err => {
                result = {error:true,description:err};
                errorsController.logger({error:'deleteSchool',description:err});
            });

            return result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'deleteSchool: '+e});
        }

    };

    static async updateSchool(body) {
        var invalid = {};
        try {
            await School.findByIdAndUpdate(body._id, body, {}).catch(err => {
                invalid = {error:true,description:err};
                errorsController.logger({error:'updateSchool',description:err});
            });
            return invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'updateSchool: '+e});
        }

    }

    static async addSubject(body) {
        var invalid = {};
        try {
            var school = await SchoolController.getSchool(body.schoolid);
            if(school.error)
                return school;
            var subject = await SubjectController.getSubject(body.subjectid);
            if(subject.error)
                return subject;
            var result = await School.findByIdAndUpdate(
                body.schoolid,
                { $addToSet: {"subjects": body.subjectid}},
                { upsert: true},(err,schools)=>{
                    if(err){
                        invalid = {error:true,description:err};
                        errorsController.logger({error:'addSubject',description:err});
                    }
                    if(schools){
                        SubjectController.updateSubject({_id:body.subjectid,schoolid:school._id});
                    }
                });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'addSubject: '+e});
        }
    };

    // TODO: don't need now! but need to fix
    static async deleteSubject(body) {
        try {
            School.findByIdAndUpdate(
                body.schoolid,
                { $pull: {"subjects": body.subjectid }},
                { upsert: true, new: true },
                err=>{
                    if(err) errorsController.logger("Delete Subject from School",err);
                });
        }
        catch (e) {
            errorsController.logger({error:true,description:'deleteSubject: '+e});
        }
    };

    static async addpermission(body) {
        var invalid = {};
        try {
            var school = await this.getSchool(body.schoolid);
            if(school.error)
                return school;
            var result = await school.findByIdAndUpdate(
                body.schoolid,
                { $addToSet: {"permission": body.userid}},
                { upsert: true },
                (err)=>{
                    if(err){
                        invalid = {error:true,description:err};
                        errorsController.logger({error:'addpermission',description:err});
                    }
                });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'addpermission: '+e});
        }
    };

    static async deletepermission(body) {
        var invalid = {};
        try {
            var school = await this.getSchool(body.schoolid);
            if(school.error)
                return school;
            await School.findByIdAndUpdate(
                body.schoolid,
                { $pull: {"permission": body.userid }},
                { upsert: true },
                err=>{
                    if(err) {
                        invalid = {error: true, description: err};
                        errorsController.logger({error: 'deletepermission', description: err});
                    }
                });
        }
        catch (e) {
            errorsController.logger({error:true,description:'deletepermission: '+e});
        }

    };

    static async cms(schoolID) {
        let subjects = await SchoolController.getSubjects(schoolID);
        if(subjects.error) {
            return { error: true, description: 'CMS + ' + subjects.description}
        }

        let totalViewsInSchool = 0;
        for (let i = 0; i < subjects.length; i++) {
            for (let j = 0; j < subjects[i].lectures.length; j++) {
                totalViewsInSchool += (await LectureController.cms(subjects[i].lectures[j])).total;
            }
        }
        return { total: totalViewsInSchool}

    }



}

module.exports = SchoolController;