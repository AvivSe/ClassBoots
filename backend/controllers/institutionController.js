const Institution = require('../models/institution');
const errorsController = require('../controllers/errorsController');
const SchoolController = require('../controllers/schoolController');


class InstitutionController {
    static async getInstitutionCollection() {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await Institution.find(err => {
            if (err) {
                result = invalid;
                errorsController.logger(err,result);
            }
        });
        return result;
    };


    static async createInstitution(body) {
        var result = null;
        var institution = new Institution(body);
        await institution.save(err => {
            if (err) {
                result = err;
                errorsController.logger(err,result);
            }
        });
        return result;
    };


    static async getInstitution(id) {
        let result = null;

        await Institution.findById(id).then(institution => {
            if (institution)
                result = institution;
            else
                result = {"ERROR":"institution not found"};
        }).catch(err => {
            result = err;
            errorsController.logger(err,result);
        });
        return result;
    };

    /**
     * delete institution and call to remove all schools of this institution
     * @param id of institution to be removed.
     * @returns {Promise<*>}
     */
    static async deleteInstitution(id) {
        let result = null;
        let obj = await Institution.findByIdAndDelete(id);
        if(!result)
        {
            obj.schools.forEach(async schoolId => {
                result = await SchoolController.deleteSchool(schoolId);
                if (result) {
                    console.log(result);
                }
            });
        }
        return result;
    };
}

module.exports = InstitutionController;