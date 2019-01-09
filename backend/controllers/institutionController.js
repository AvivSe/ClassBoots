const Institution = require('../models/institution');

class InstitutionController {
    static async getInstitutionCollection(body) {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await User.find(err => {
            if (err) {
                result = invalid;
            }
        });
        return result;
    };

    static async createInstitution(body) {
        let result = null;
        // TODO: Check body schema
        const institution = new Institution(body);

        await institution.create(err => {
            if (err) {
                result = err;
            } else {
                result = "Added";
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
        });
        return result;
    };
}

module.exports = InstitutionController;