const Institution = require('../models/institution');
const errorsController = require('../controllers/errorsController');

// crod - create delete update get
// get collection([filters])
//

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

    static async getInstitution(name) {
        let result = null;

        await Institution.findOne({name: name}).then(institution => {
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
}

module.exports = InstitutionController;