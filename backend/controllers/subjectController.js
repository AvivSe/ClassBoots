const Subject = require('../models/subject');
const LectureController = require('../controllers/lectureController');
const errorsController = require('../controllers/errorsController');
const SchoolController = require('../controllers/schoolController');


class SubjectController {
    static async getSubjectCollection() {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await Subject.find(err => {
            if (err) {
                result = invalid;
                errorsController.logger(err,result);
            }
        });
        return result;
    };


    static async createSubject(body) {
        var subject = new Subject(body);
        await subject.save(err => {
            if (err) {
                errorsController.logger("Create Subject",err);
            }
        });
        return subject;
    };

    static async updateSubject(body) {
        let result = await Subject.findByIdAndUpdate(body._id, body, {new: true}, err => {
            if (err) errorsController.logger("update Subject",err);
        });
        return result;
    }

    static async getSubject(id) {
        let result = null;
        await Subject.findById(id).then(subject => {
            if (subject)
                result = subject;
            else
                result = {"ERROR":"subject not found"};
        }).catch(err => {
            result = {"ERROR":"subject not found"};
            errorsController.logger("Get Subject",err);
        });
        return result;
    };

    static async getLectures(id) {
        let result = await this.getSubject(id);
        if(result.ERROR)
            return result;
        var mylectures = [];
        for (let i = 0; i < result.lectures.length; i++) {
            let lecture = await LectureController.getLecture(result.lectures[i]);
            if(lecture.ERROR !== undefined)
                this.deleteLecture({subjectid:id,lectureid:result.lectures[i]});
            else mylectures.push(lecture);
        }
        return mylectures;
    };

    /**
     * delete subject and call to remove all lectures of this subject
     * @param id of subject to be removed.
     * @returns {Promise<*>}
     */
    static async deleteSubject(id) {
        let result = null;
        let obj = await Subject.findByIdAndDelete(id);
        if(!result)
        {
            obj.lectures.forEach(async lectureId => {
                result = await LectureController.deleteLecture(lectureId);
                if (result) {
                    console.log(result);
                }
            });
        }
        return result;
    };

    static async addLecture(body) {
        var result = await Subject.findByIdAndUpdate(
            body.subjectid,
            { $push: {"lectures": body.lectureid}},
            { upsert: true, new: true });
        return result;
    };

    static async deleteLecture(body) {
        Subject.findByIdAndUpdate(
            body.subjectid,
            { $pull: {"lectures": body.lectureid }},
            { upsert: true, new: true },
            err=>{
                if(err) errorsController.logger("Delete Lecture from Subject",err);
            });
    };

    static async checkPermission(body) {
        var result = await this.getSubject(body.subjectid);
        console.log(result);
        return await result.ERROR !== undefined?SchoolController.checkPermission({schoolid:result.schoolid,userid:body.userid}):false;
    };
}

module.exports = SubjectController;