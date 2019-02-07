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
        var institution = new Institution(body);
        await institution.save(err => {
            if (err) {
                errorsController.logger("Create Institution",err);
            }
        });
        return institution;
    };


    static async getInstitution(id) {
        let result = null;
        await Institution.findById(id).then(institution => {
            if (institution) {
                result = institution;
            }
            else
                result = {"ERROR":"institution not found"};
        }).catch(err => {
            result = {"ERROR":"institution not found"};
            errorsController.logger("Get Subject",err);
        });

        return result;
    };

    static async getSchools(id) {
        let result = await this.getInstitution(id);
        if(result.ERROR)
            return result;
        var myschools = [];
        for (let i = 0; i < result.schools.length; i++) {
            let school = await SchoolController.getSchool(result.schools[i]);
            if(school.ERROR !== undefined)
                this.deleteSchool({institutionid:id,schoolid:result.schools[i]});
            else myschools.push(school);
        }
        return myschools;
    };

    /**
     * delete institution and call to remove all schools of this institution
     * @param id of institution to be removed.
     * @returns {Promise<*>}
     */
    // TODO: need to fix the delete
    static async deleteInstitution(id) {
        let result = await Institution.findByIdAndDelete(id);
        if(!result)
        {
            for (let i = 0; i < result.schools.length; i++) {
                let obj = await SchoolController.deleteSchool(result.schools[i]);
                if (obj) {
                    console.log(obj);
                }
            }
        }
        return result;
    };

    static async updateInstitution(body) {
        let result = await Institution.findByIdAndUpdate(body._id, body, {new: true}, err => {
            if (err) errorsController.logger("update Institution",err);
        });
        return result;
    }

    static async addSchool(body) {
        var result = await Institution.findByIdAndUpdate(
            body.institutionid,
            { $push: {"schools": body.schoolid}},
            { upsert: true, new: true });
        return result;
    };

    static async deleteSchool(body) {
        Institution.findByIdAndUpdate(
            body.institutionid,
            { $pull: {"schools": body.schoolid }},
            { upsert: true, new: true },
            err=>{
                if(err) errorsController.logger("Delete School from Institution",err);
            });
    };

    static async addpermission(body) {
        var result = await Institution.findByIdAndUpdate(
            body.institutionid,
            { $push: {"permission": body.userid}},
            { upsert: true, new: true });
        return result;
    };

    static async deletepermission(body) {
        Institution.findByIdAndUpdate(
            body.institutionid,
            { $pull: {"permission": body.userid }},
            { upsert: true, new: true },
            err=>{
                if(err) errorsController.logger("Delete user permission from Institution",err);
            });
    };

    static async checkPermission(body) {
        var result = await this.getInstitution(body.institutionid);
        console.log(result);
        if(await result.ERROR !== undefined)
        {
            for (let i = 0; i < result.permission.length; i++) {
                if(result.permission[i] == body.userid)
                    return true
            }
        }
        return false;
    };
}

module.exports = InstitutionController;