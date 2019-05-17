const Institution = require('../models/institution');
const School = require('../models/school');
const errorsController = require('./errorsController');
const SchoolController = require('./schoolController');

class InstitutionController {
    static async getInstitutionCollection() {
        try {
            let result;
            let invalid = {};
            result = await Institution.find(err => {
                if (err) {
                    invalid = {error:true,description:err};
                    errorsController.logger({error:'getInstitutionCollection',description:err});
                }
            });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:'getInstitutionCollection',description:e});
            return {error:true,description:'getInstitutionCollection: '+e};
        }
    };

    static async createInstitution(body) {
        try{
            let result = {};
            let institution = new Institution(body);
            await institution.save(err => {
            if (err) {
                result = {error:true,description:err};
                errorsController.logger({error:'createInstitution',description:err});
            }
            });
            return result.error===undefined?institution:result;
        }
        catch (e) {
            errorsController.logger({error:'createInstitution',description:e});
            return {error:true,description:'createInstitution: '+e};
        }
    };


    static async getInstitution(id) {
        try {
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
        }
        catch (e) {
            errorsController.logger({error:'getInstitution',description:e});
            return {error:true,description:'getInstitution: '+e};
        }

    };

    static async getSchools(id) {
        try {
            let result = [];
            await this.getInstitution(id).then(async institution=>{
                for (let i = 0; i < institution.schools.length; i++) {
                    await SchoolController.getSchool(institution.schools[i]).then(async school=>{
                        result.push(school);
                    });
                }
            }).catch(async err=>{
                result = {error:true,description:'institution not found'};
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:'getSchools',description:e});
            return {error:true,description:'getSchools: '+e};
        }

    };

    static async getSchoolsGB() {
        try {
            let result = [];
            result=await School.aggregate([
                {"$group":{_id: "$institutionid",schools:{$push:"$name"}}}
            ]);
            for (let i = 0; i < result.length; i++) {
                let x = await this.getInstitution(result[i]._id);
                result[i].institution = x.name;
                delete result[i]._id;
            }
            return result;
        }
        catch (e) {
            errorsController.logger({error: 'getSchoolsGB', description: e});
            return {error: true, description: 'getSchoolsGB: ' + e}
        }
    };

    /**
     * delete institution and call to remove all schools of this institution
     * @param id of institution to be removed.
     * @returns {Promise<*>}
     */
    static async deleteInstitution(id) {
        try {
            let result = null;
            await Institution.findByIdAndDelete(id).then(obj=>{
                result = {Deleted:id};
                obj.schools.forEach(async schoolId => {
                    SchoolController.deleteSchool(schoolId);
                });
            }).catch(err => {
                result = {error:true,description:err};
                errorsController.logger({error:'deleteInstitution',description:err});
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:'deleteInstitution',description:e});
            return {error:true,description:'deleteInstitution: '+e};
        }

    };

    static async updateInstitution(body) {
        try {
            let invalid = {};
            await Institution.findByIdAndUpdate(body._id, body, {}).catch(err => {
                invalid = {error:true,description:err};
                errorsController.logger({error:'updateInstitution',description:err});
            });
            return invalid;
        }
        catch (e) {
            errorsController.logger({error:'updateInstitution',description:e});
            return {error:true,description:'updateInstitution: '+e};
        }
    }

    static async addSchool(body) {
        try {
            let invalid = {};
            var institution = await this.getInstitution(body.institutionid);
            if(institution.error)
                return institution;
            var school = await SchoolController.getSchool(body.schoolid);
            if(school.error)
                return school;
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
        }
        catch (e) {
            errorsController.logger({error:'addSchool',description:e});
            return {error:true,description:'addSchool: '+e};
        }

    };

    // TODO: don't need now! but need to fix
    static async deleteSchool(body) {
        if(!body.institutionid || !body.schoolid)
            return {error:true,description:'you don\'t have validation'};
        try {
            Institution.findByIdAndUpdate(
                body.institutionid,
                { $pull: {"schools": body.schoolid }},
                { upsert: true, new: true },
                err=>{
                    if(err) errorsController.logger("Delete School from Institution",err);
                });
        }
        catch (e) {
            errorsController.logger({error:'deleteSchool',description:e});
            return {error:true,description:'deleteSchool: '+e};
        }

    };

    static async addpermission(body) {
        try {
            let invalid = {};
            let institution = await this.getInstitution(body.institutionid);
            if(institution.error)
                return institution;
            let result = await Institution.findByIdAndUpdate(
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
        }
        catch (err) {
            errorsController.logger({error:'addpermission',description:err});
            return {error:true,description:'addpermission: '+err};
        }

    };

    static async deletepermission(body) {
        if(!body.institutionid || !body.userid)
            return {error:true,description:'you don\'t have validation'};
        try {
            let invalid = {};
            let institution = await this.getInstitution(body.institutionid);
            if(institution.error)
                return institution;
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
            return invalid.error===undefined?result:invalid;
        }
        catch (err) {
            errorsController.logger({error:'deletepermission',description:err});
            return {error:true,description:'deletepermission: '+err};
        }

    };


}

module.exports = InstitutionController;