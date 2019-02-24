const Institution = require('../models/institution');
const errorsController = require('./errorsController');
const SchoolController = require('./schoolController');
console.log('Institution connect');

class InstitutionController {
    static async getInstitutionCollection() {
        var result = null;
        var invalid = {};
        result = await Institution.find(err => {
            if (err) {
                invalid = {error:true,description:err};
                errorsController.logger({error:'getInstitutionCollection',description:err});
            }
        });
        return invalid.error===undefined?result:invalid;
    };

    static async createInstitution(body) {
        var result = null;
        var institution = new Institution(body);
        await institution.save(err => {
            if (err) {
                result = {error:true,description:err};
                errorsController.logger({error:'createInstitution',description:err});
            }
        });
        return result.error===undefined?institution:result;
    };


    static async getInstitution(id) {
        var result = null;
        await Institution.findById(id).then(institution => {
            if (institution)
                result = institution;
            else
                result = {error:true,description:'Institution not found'};
        }).catch(err => {
            result = {error:true,description:err};
            errorsController.logger({error:'getInstitution',description:err});
        });
        return result;
    };

    static async getSchools(id) {
        let result = await this.getInstitution(id);
        if(result.error)
            return result;
        var myschools = [];
        for (let i = 0; i < result.schools.length; i++) {
            let school = await SchoolController.getSchool(result.schools[i]);
            if(school.error !== undefined)
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
    // TODO: fix the delete and continue from here!!!!
    static async deleteInstitution(id) {
        let result = null;
        var institution = await this.getInstitution(id);
        if(institution.error !== undefined){
            errorsController.logger({error:'deleteInstitution',description:institution.description});
            return institution;
        }
        let obj = await Institution.findByIdAndDelete(id);
        obj.schools.forEach(async schoolId => {
            result = await SchoolController.deleteSchool(schoolId);
        });
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

}

module.exports = InstitutionController;