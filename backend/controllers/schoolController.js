const School = require('../models/school');
const SubjectController = require('./subjectController');
const errorsController = require('./errorsController');
const LectureController = require('./lectureController');


class SchoolController {
    static async getSchoolCollection() {

        try {
            let result;
            let invalid = {};
            result = await School.find(err => {
                if (err) {
                    invalid = {error: true, description: err};
                    errorsController.logger({error: 'getSchoolCollection', description: err});
                }
            });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'getSchoolCollection', description: e});
            return {error: true, description: 'getSchoolCollection: ' + e};
        }
    };

    static async createSchool(body) {
        try {
            let result = {};
            let school = new School(body);
            await school.save((err) => {
                if (err) {
                    result = {error: true, description: err};
                    errorsController.logger({error: 'createInstitution', description: err});
                }
            });
            return result.error === undefined ? school : result;
        } catch (e) {
            errorsController.logger({error: 'createSchool', description: e});
            return {error: true, description: 'createSchool: ' + e};
        }

    }

    static async getSchool(id) {
        try {
            let result = null;
            await School.findById(id).then(school => {
                if (school)
                    result = school;
                else
                    result = {error: true, description: 'school not found'};
            }).catch(err => {
                result = {error: true, description: err};
                errorsController.logger({error: 'getSchool', description: err});
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'getSchool', description: e});
            return {error: true, description: 'getSchool: ' + e};
        }

    };

    static async getSubjects(id) {
        try {
            let result = [];
            await this.getSchool(id).then(async school => {
                for (let i = 0; i < school.subjects.length; i++) {
                    await SubjectController.getSubject(school.subjects[i]).then(async subject => {
                        result.push(subject);
                    });
                }
            }).catch(async err => {
                result = {error: true, description: 'School not found'};
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'getSubjects', description: e});
            return {error: true, description: 'getSubjects: ' + e};
        }

    };

    /**
     * delete school and call to remove all subjects of this school
     * @param id of school to be removed.
     * @returns {Promise<*>}
     */
    static async deleteSchool(id) {
        try {
            let result = null;
            await School.findByIdAndDelete(id).then(obj => {
                result = {Deleted: id};
                obj.subjects.forEach(async subjectId => {
                    SubjectController.deleteSubject(subjectId);
                });
            }).catch(err => {
                result = {error: true, description: err};
                errorsController.logger({error: 'deleteSchool', description: err});
            });

            return result;
        } catch (e) {
            errorsController.logger({error: 'deleteSchool', description: e});
            return {error: true, description: 'deleteSchool: ' + e};
        }

    };

    static async updateSchool(body) {
        try {
            let invalid = {};
            await School.findByIdAndUpdate(body._id, body, {}).catch(err => {
                invalid = {error: true, description: err};
                errorsController.logger({error: 'updateSchool', description: err});
            });
            return invalid;
        } catch (e) {
            errorsController.logger({error: 'updateSchool', description: e});
            return {error: true, description: 'updateSchool: ' + e};
        }

    }

    static async addSubject(body) {
        try {
            let invalid = {};
            let school = await SchoolController.getSchool(body.schoolid);
            if (school.error)
                return school;
            let subject = await SubjectController.getSubject(body.subjectid);
            if (subject.error)
                return subject;
            let result = await School.findByIdAndUpdate(
                body.schoolid,
                {$addToSet: {"subjects": body.subjectid}},
                {upsert: true}, (err, schools) => {
                    if (err) {
                        invalid = {error: true, description: err};
                        errorsController.logger({error: 'addSubject', description: err});
                    }
                    if (schools) {
                        SubjectController.updateSubject({_id: body.subjectid, schoolid: school._id});
                    }
                });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'addSubject', description: e});
            return {error: true, description: 'addSubject: ' + e};
        }
    };

    // TODO: don't need now! but need to fix
    static async deleteSubject(body) {
        if (!body.schoolid || !body.subjectid)
            return {error: true, description: 'you don\'t have validation'};

        try {

            School.findByIdAndUpdate(
                body.schoolid,
                {$pull: {"subjects": body.subjectid}},
                {upsert: true, new: true},
                err => {
                    if (err) errorsController.logger("Delete Subject from School", err);
                });
        } catch (e) {
            errorsController.logger({error: 'deleteSubject', description: e});
            return {error: true, description: 'deleteSubject: ' + e};
        }
    };

    static async addpermission(body) {
        try {
            let invalid = {};
            let school = await this.getSchool(body.schoolid);
            if (school.error)
                return school;
            let result = await school.findByIdAndUpdate(
                body.schoolid,
                {$addToSet: {"permission": body.userid}},
                {upsert: true},
                (err) => {
                    if (err) {
                        invalid = {error: true, description: err};
                        errorsController.logger({error: 'addpermission', description: err});
                    }
                });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'addpermission', description: e});
            return {error: true, description: 'addpermission: ' + e};
        }
    };

    static async deletepermission(body) {
        try {

            let invalid = {};
            let school = await this.getSchool(body.schoolid);
            if (school.error)
                return school;
            await School.findByIdAndUpdate(
                body.schoolid,
                {$pull: {"permission": body.userid}},
                {upsert: true},
                err => {
                    if (err) {
                        invalid = {error: true, description: err};
                        errorsController.logger({error: 'deletepermission', description: err});
                    }
                });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'deletepermission', description: e});
            return {error: true, description: 'deletepermission: ' + e};
        }

    };

    static async cms(schoolID) {
        try {
            let subjects = await SchoolController.getSubjects(schoolID);
            if (subjects.error) {
                return {error: true, description: 'CMS + ' + subjects.description}
            }

            let totalViewsInSchool = 0;
            for (let i = 0; i < subjects.length; i++) {
                for (let j = 0; j < subjects[i].lectures.length; j++) {
                    totalViewsInSchool += (await LectureController.cms(subjects[i].lectures[j])).total;
                }
            }
            return {total: totalViewsInSchool};
        } catch (e) {
            errorsController.logger({error: 'cms', description: e});
            return {error: true, description: 'cms: ' + e};
        }


    }


}

module.exports = SchoolController;