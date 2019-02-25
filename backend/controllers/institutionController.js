const Institution = require('../models/institution');
const errorsController = require('./errorsController');
const SchoolController = require('./schoolController');

class InstitutionController {
    static async getInstitutionCollection() {
        var result;
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
        var result = {};
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
        let result = [];
        await this.getInstitution(id).then(async institution=>{
            for (let i = 0; i < institution.schools.length; i++) {
                await SchoolController.getSchool(institution.schools[i]).then(async school=>{
                    if(school.error !== undefined)
                        this.deleteSchool({institutionid:id,schoolid:institution.schools[i]});
                    else result.push(school);
                });
            }
        }).catch(async err=>{
            result = {error:true,description:'institution not found'};
            // TODO: need to fix
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
        await Institution.findByIdAndDelete(id).then(obj=>{
            obj.schools.forEach(async schoolId => {
                result = await SchoolController.deleteSchool(schoolId);
            });
        }).catch(err => {
            result = {error:true,description:err};
            errorsController.logger({error:'deleteInstitution',description:err});
        });
        return result;
    };

    static async updateInstitution(body) {
        var invalid = {};
        await Institution.findByIdAndUpdate(body._id, body, {}).catch(err => {
            invalid = {error:true,description:err};
            errorsController.logger({error:'updateInstitution',description:err});
        });
        return invalid;
    }

    static async addSchool(body) {
        var institution = await this.getInstitution(body.institutionid);
        if(institution.error)
            return institution;
        var school = await SchoolController.getSchool(body.schoolid);
        if(school.error)
            return school;
        var invalid = {};
        var result = await Institution.findByIdAndUpdate(
            body.institutionid,
            { $addToSet: {"schools": body.schoolid}},
            { upsert: true},(err,institution)=>{
                if(err){
                    invalid = {error:true,description:err};
                    errorsController.logger({error:'addSchool',description:err});
                }
                if(institution){
                    SchoolController.updateSchool({_id:body.schoolid,institutionid:institution._id});
                }
            });
        return invalid.error===undefined?result:invalid;
    };

    // TODO: don't need now! but need to fix
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
        var institution = await this.getInstitution(body.institutionid);
        if(institution.error)
            return institution;
        var invalid = {};
        var result = await Institution.findByIdAndUpdate(
            body.institutionid,
            { $addToSet: {"permission": body.userid}},
            { upsert: true },
            (err)=>{
                if(err){
                    invalid = {error:true,description:err};
                    errorsController.logger({error:'addpermission',description:err});
                }
            });
        return invalid.error===undefined?result:invalid;
    };

    static async deletepermission(body) {
        var institution = await this.getInstitution(body.institutionid);
        if(institution.error)
            return institution;
        var invalid = {};
        await Institution.findByIdAndUpdate(
            body.institutionid,
            { $pull: {"permission": body.userid }},
            { upsert: true },
            err=>{
                if(err) {
                    invalid = {error: true, description: err};
                    errorsController.logger({error: 'deletepermission', description: err});
                }
            });
    };

}

module.exports = InstitutionController;