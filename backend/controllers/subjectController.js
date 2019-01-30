const Subject = require('../models/subject');
const LectureController = require('../controllers/lectureController');

class SubjectController {
    static async getSubjectCollection() {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await Subject.find(err => {
            if (err) {
                result = invalid;
            }
        });
        return result;
    };


    static async createSubject(body) {
        var result = null;
        var subject = new Subject(body);
        await subject.save(err => {
            if (err)
                result = err;
        });
        return result;
    };


    static async getSubject(id) {
        let result = null;

        await Subject.findById(id).then(subject => {
            if (subject)
                result = subject;
            else
                result = {"ERROR":"subject not found"};
        }).catch(err => {
            result = err;
        });
        return result;
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

}

module.exports = SubjectController;