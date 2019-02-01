const School = require('../models/School');
const SubjectController = require('./subjectController');
const errorsController = require('../controllers/errorsController');


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
        var result = null;
        var school = new School(body);
        await school.save(err => {
            if (err) {
                result = err;
                errorsController.logger(err,result);
            }
        });
        return result;
    };


    static async getSchool(id) {
        let result = null;

        await School.findById(id).then(school => {
            if (school)
                result = school;
            else
                result = {"ERROR":"school not found"};
        }).catch(err => {
            result = err;
            errorsController.logger(err,result);
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

}

module.exports = SchoolController;