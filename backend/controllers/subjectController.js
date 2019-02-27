const Subject = require('../models/subject');
const LectureController = require('./lectureController');
const errorsController = require('./errorsController');
const {Sketch} = require('./videoController');


class SubjectController {
    static async getSubjectCollection() {
        var result;
        var invalid = {};
        try {
            result = await Subject.find(err => {
                if (err) {
                    invalid = {error:true,description:err};
                    errorsController.logger({error:'getSubjectCollection',description:err});
                }
            });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'getSubjectCollection: '+e});
        }

    };


    static async createSubject(body) {
        var result = {};
        var subject = new Subject(body);
        try {
            await subject.save(err => {
                if (err) {
                    result = {error:true,description:err};
                    errorsController.logger({error:'createSubject',description:err});
                }
            });
            return result.error===undefined?subject:result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'createSubject: '+e});
        }

    };

    static async updateSubject(body) {
        var invalid = {};
        try {
            await Subject.findByIdAndUpdate(body._id, body, {}).catch(err => {
                invalid = {error:true,description:err};
                errorsController.logger({error:'updateSubject',description:err});
            });
            return invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'updateSubject: '+e});
        }

    }

    static async getSubject(id) {
        var result = null;
        try {
            await Subject.findById(id).then(subject => {
                if (subject)
                    result = subject;
                else
                    result = {error:true,description:'subject not found'};
            }).catch(err => {
                result = {error:true,description:err};
                errorsController.logger({error:'getSubject',description:err});
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'getSubject: '+e});
        }

    };

    static async getLectures(id) {
        let result = [];
        try {
            await this.getSubject(id).then(async subject=>{
                for (let i = 0; i < subject.lectures.length; i++) {
                    await LectureController.getLecture(subject.lectures[i]).then(async lecture=>{
                        if(lecture.error !== undefined)
                            this.deleteLecture({subjectid:id,lectureid:result.lectures[i]});
                        else result.push(lecture);
                    });
                }
            }).catch(async err=>{
                result = {error:true,description:'subject not found'};
                // TODO: need to fix
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'getLectures: '+e});
        }

    };

    /**
     * delete subject and call to remove all lectures of this subject
     * @param id of subject to be removed.
     * @returns {Promise<*>}
     */
    static async deleteSubject(id) {
        let result = null;
        try {
            await Subject.findByIdAndDelete(id).then(obj=>{
                obj.lectures.forEach(async lectureID => {
                    result = await LectureController.deleteLecture(lectureID);
                });
            }).catch(err => {
                result = {error:true,description:err};
                errorsController.logger({error:'deleteSubject',description:err});
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'deleteSubject: '+e});
        }

    };

    static async addLecture(body) {
        var invalid = {};
        try {
            var subject = await this.getSubject(body.subjectid);
            if(subject.error)
                return subject;
            var lecture = await LectureController.getLecture(body.lectureid);
            if(lecture.error)
                return lecture;
            var result = await Subject.findByIdAndUpdate(
                body.subjectid,
                { $addToSet: {"lectures": body.lectureid}},
                { upsert: true},(err,subject)=>{
                    if(err){
                        invalid = {error:true,description:err};
                        errorsController.logger({error:'addLecture',description:err});
                    }
                    if(subject){
                        LectureController.updateLecture({_id:body.lectureid,subjectid:subject._id});
                    }
                });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'addLecture: '+e});
        }
    };

    static async deleteLecture(body) {
        try {
            Subject.findByIdAndUpdate(
                body.subjectid,
                { $pull: {"lectures": body.lectureid }},
                { upsert: true, new: true },
                err=>{
                    if(err) errorsController.logger("Delete lectures from subject",err);
                });
        }
        catch (e) {
            errorsController.logger({error:true,description:'deleteLecture: '+e});
        }

    };

    static async cms(subjectID) {
        let subject = await SubjectController.getSubject(subjectID);
        let lectures = subject.lectures.map(lec=> {
            return lec._id;
        });

        console.log(lectures);
        let totalLecturesInSubject = 0;
        for (let i = 0; i < lectures.length; i++) {
            totalLecturesInSubject += (await LectureController.cms(lectures[i])).total;
        }

        return { total: totalLecturesInSubject };
    }

}

module.exports = SubjectController;