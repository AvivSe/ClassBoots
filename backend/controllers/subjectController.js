const Subject = require('../models/subject');
const LectureController = require('./lectureController');
const errorsController = require('./errorsController');
const {Sketch} = require('./videoController');


class SubjectController {
    static async getSubjectCollection() {
        try {
            let result;
            let invalid = {};
            result = await Subject.find(err => {
                if (err) {
                    invalid = {error: true, description: err};
                    errorsController.logger({error: 'getSubjectCollection', description: err});
                }
            });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'getSubjectCollection', description: e});
            return {error: true, description: 'getSubjectCollection: ' + e};
        }
    };


    static async createSubject(body) {
        try {
            let result = {};
            let subject = new Subject(body);
            await subject.save(err => {
                if (err) {
                    result = {error: true, description: err};
                    errorsController.logger({error: 'createSubject', description: err});
                }
            });
            return result.error === undefined ? subject : result;
        } catch (e) {
            errorsController.logger({error: 'createSubject', description: e});
            return {error: true, description: 'createSubject: ' + e};
        }

    };

    static async updateSubject(body) {
        try {
            let invalid = {};
            await Subject.findByIdAndUpdate(body._id, body, {}).catch(err => {
                invalid = {error: true, description: err};
                errorsController.logger({error: 'updateSubject', description: err});
            });
            return invalid;
        } catch (e) {
            errorsController.logger({error: 'updateSubject', description: e});
            return {error: true, description: 'updateSubject: ' + e};
        }

    }

    static async getSubject(id) {
        try {
            let result = null;
            await Subject.findById(id).then(subject => {
                if (subject)
                    result = subject;
                else
                    result = {error: true, description: 'subject not found'};
            }).catch(err => {
                result = {error: true, description: err};
                errorsController.logger({error: 'getSubject', description: err});
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'getSubject', description: e});
            return {error: true, description: 'getSubject: ' + e};
        }

    };

    static async getLectures(id) {
        try {
            let result = [];
            await this.getSubject(id).then(async subject => {
                for (let i = 0; i < subject.lectures.length; i++) {
                    await LectureController.getLecture(subject.lectures[i]).then(async lecture => {
                        result.push(lecture);
                    });
                }
            }).catch(async err => {
                result = {error: true, description: 'subject not found'};
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'getLectures', description: e});
            return {error: true, description: 'getLectures: ' + e};
        }

    };

    /**
     * delete subject and call to remove all lectures of this subject
     * @param id of subject to be removed.
     * @returns {Promise<*>}
     */
    static async deleteSubject(id) {
        try {
            let result = null;
            await Subject.findByIdAndDelete(id).then(obj => {
                result = {Deleted: id};
                obj.lectures.forEach(async lectureID => {
                    LectureController.deleteLecture(lectureID);
                });
            }).catch(err => {
                result = {error: true, description: err};
                errorsController.logger({error: 'deleteSubject', description: err});
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'deleteSubject', description: e});
            return {error: true, description: 'deleteSubject: ' + e};
        }

    };

    static async addLecture(body) {
        try {
            let invalid = {};
            let subject = await this.getSubject(body.subjectid);
            if (subject.error)
                return subject;
            let lecture = await LectureController.getLecture(body.lectureid);
            if (lecture.error)
                return lecture;
            let result = await Subject.findByIdAndUpdate(
                body.subjectid,
                {$addToSet: {"lectures": body.lectureid}},
                {upsert: true}, (err, subject) => {
                    if (err) {
                        invalid = {error: true, description: err};
                        errorsController.logger({error: 'addLecture', description: err});
                    }
                    if (subject) {
                        LectureController.updateLecture({_id: body.lectureid, subjectid: subject._id});
                    }
                });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'addLecture', description: e});
            return {error: true, description: 'addLecture: ' + e};
        }
    };

    static async deleteLecture(body) {
        if (!body.subjectid || !body.lectureid)
            return {error: true, description: 'you don\'t have validation'};
        try {
            Subject.findByIdAndUpdate(
                body.subjectid,
                {$pull: {"lectures": body.lectureid}},
                {upsert: true, new: true},
                err => {
                    if (err) errorsController.logger("Delete lectures from subject", err);
                });
        } catch (e) {
            errorsController.logger({error: 'deleteLecture', description: e});
            return {error: true, description: 'deleteLecture: ' + e};
        }

    };

    static async cms(subjectID) {
        try {
            let subject = await SubjectController.getSubject(subjectID);
            let lectures = subject.lectures.map(lec=> {
                return lec._id;
            });
            let totalLecturesInSubject = 0;
            for (let i = 0; i < lectures.length; i++) {
                totalLecturesInSubject += (await LectureController.cms(lectures[i])).total;
            }
            return { total: totalLecturesInSubject };
        }
        catch (e) {
            errorsController.logger({error:'cms',description:e});
            return {error:true,description:'cms: '+e};
        }
    }

}

module.exports = SubjectController;