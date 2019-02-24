const School = require('../models/school');
const SubjectController = require('./subjectController');
const errorsController = require('./errorsController');

console.log('School connect');


class SchoolController {
    static async getSchoolCollection() {
        var result;
        var invalid = {};
        result = await School.find(err => {
            if (err) {
                invalid = {error:true,description:err};
                errorsController.logger({error:'getSchoolCollection',description:err});
            }
        });
        return invalid.error===undefined?result:invalid;
    };

    static async createSchool(body) {
        var result = {};
        var school = new School(body);
        await school.save((err)=> {
            if (err) {
                result = {error:true,description:err};
                errorsController.logger({error:'createInstitution',description:err});
            }
            });
        return result.error===undefined?school:result;
    }

    static async getSchool(id) {
        let result = null;
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
    };

    static async getSubjects(id) {
        let result = [];
        result = await this.getSchool(id).then(async school=>{
            for (let i = 0; i < school.subjects.length; i++) {
                let subject = await SubjectController.getSubject(school.subjects[i]);
                if(subject.error !== undefined)
                    this.deleteSubject({schoolid:id,subjectid:school.subjects[i]});
                else result.push(subject);
            }
        }).catch(async err=>{
            result = {error:true,description:'school not found'};
            // TODO: need to fix
        });
        return result;
    };

    /**
     * delete school and call to remove all subjects of this school
     * @param id of school to be removed.
     * @returns {Promise<*>}
     */
    static async deleteSchool(id) {
        let result = null;
        await School.findByIdAndDelete(id).then(obj=>{
            obj.subjects.forEach(async subjectId => {
                result = await SubjectController.deleteSubject(subjectId);
            });
        }).catch(err => {
            result = {error:true,description:err};
            errorsController.logger({error:'deleteSchool',description:err});
        });

        return result;
    };

    static async updateSchool(body) {
        var invalid = {};
        await School.findByIdAndUpdate(body._id, body, {}).catch(err => {
            invalid = {error:true,description:err};
            errorsController.logger({error:'updateSchool',description:err});
        });
        return invalid;
    }

    static async addSubject(body) {
        var school = await SchoolController.getSchool(body.schoolid);
        if(school.error)
            return school;
        var subject = await SubjectController.getSubject(body.subjectid);
        if(subject.error)
            return subject;
        var invalid = {};
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
    };

    // TODO: don't need now! but need to fix
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
        var school = await this.getSchool(body.schoolid);
        if(school.error)
            return school;
        var invalid = {};
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
    };

    static async deletepermission(body) {
        var school = await this.getSchool(body.schoolid);
        if(school.error)
            return school;
        var invalid = {};
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
    };


}

module.exports = SchoolController;