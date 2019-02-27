const Institution = require('../models/institution');
const School = require('../models/school');
const errorsController = require('./errorsController');
const SchoolController = require('./schoolController');
var mapreduce = require('mapred')();
const SubjectController = require('./subjectController');
const LectureController = require('./lectureController');
const Video = require('../models/video');


class InstitutionController {
    static async getInstitutionCollection() {

        var result;
        var invalid = {};
        try {
            result = await Institution.find(err => {
                if (err) {
                    invalid = {error:true,description:err};
                    errorsController.logger({error:'getInstitutionCollection',description:err});
                }
            });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'getInstitutionCollection: '+e});
        }
    };

    static async createInstitution(body) {
        var result = {};
        var institution = new Institution(body);
        try{
            await institution.save(err => {
            if (err) {
                result = {error:true,description:err};
                errorsController.logger({error:'createInstitution',description:err});
            }
            });
            return result.error===undefined?institution:result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'createInstitution: '+e});
        }
    };


    static async getInstitution(id) {
        var result = null;
        try {
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
            errorsController.logger({error:true,description:'getInstitution: '+e});
        }

    };

    static async getSchools(id) {
        let result = [];
        try {
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
        }
        catch (e) {
            errorsController.logger({error:true,description:'getSchools: '+e});
        }

    };

    static async getSchoolsGB() {
        let result = [];
        result=await School.aggregate([
            {"$group":{_id: "$institutionid",schools:{$push:"$name"}}}
        ]);

        return result;
        try {
            result=await School.aggregate([
                {"$group":{_id: "$institutionid",schools:{$push:"$name"}}}
            ]);
            return result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'getSchoolsGB: '+e});
        }
    };

    /**
     * delete institution and call to remove all schools of this institution
     * @param id of institution to be removed.
     * @returns {Promise<*>}
     */
    static async deleteInstitution(id) {
        let result = null;
        try {
            await Institution.findByIdAndDelete(id).then(obj=>{
                obj.schools.forEach(async schoolId => {
                    result = await SchoolController.deleteSchool(schoolId);
                });
            }).catch(err => {
                result = {error:true,description:err};
                errorsController.logger({error:'deleteInstitution',description:err});
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:true,description:'deleteInstitution: '+e});
        }

    };

    static async updateInstitution(body) {
        var invalid = {};
        try {
            await Institution.findByIdAndUpdate(body._id, body, {}).catch(err => {
                invalid = {error:true,description:err};
                errorsController.logger({error:'updateInstitution',description:err});
            });
            return invalid;
        }
        catch (e) {
            errorsController.logger({error:true,description:'updateInstitution: '+e});
        }
    }

    static async addSchool(body) {
        var invalid = {};
        try {
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
            errorsController.logger({error:true,description:'addSchool: '+e});
        }

    };

    // TODO: don't need now! but need to fix
    static async deleteSchool(body) {
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
            errorsController.logger({error:true,description:'deleteSchool: '+e});
        }

    };

    static async addpermission(body) {
        var invalid = {};
        try {
            var institution = await this.getInstitution(body.institutionid);
            if(institution.error)
                return institution;
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
        }
        catch (e) {
            errorsController.logger({error:true,description:'addpermission: '+e});
        }

    };

    static async deletepermission(body) {
        var invalid = {};
        try {
            var institution = await this.getInstitution(body.institutionid);
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
        }
        catch (e) {
            errorsController.logger({error:true,description:'deletepermission: '+e});
        }

    };

    static async cms(instID) {
        try {
            let schools = await InstitutionController.getSchools(instID);
            if(schools.error) {
                return { error: true, description: 'CMS + ' + schools.description}
            }

            let totalViewsInInst = 0;
            for (let i = 0; i < schools.length; i++) {
                for (let j = 0; j < schools[i].subjects.length; j++) {
                    totalViewsInInst += (await SubjectController.cms(schools[i].subjects[j])).total;
                }
            }
            return { total: totalViewsInInst}
        }
        catch (e) {
            errorsController.logger({error:true,description:'cms: '+e});
        }


    }

    static async totalCms() {
        let result = { totalViews: 0, institutions: [] };
        try {
            let institution = await InstitutionController.getInstitutionCollection();
            if(institution.error) {
                return { error: true, description: 'CMS + ' + institution.description }
            }

        for (let i = 0; i < institution.length; i++) {
            let  totalInstitutionStats = { _id: institution[i]._id, name: institution[i].name , totalViews: (await InstitutionController.cms(institution[i]._id)).total, schools: []};
            for (let j = 0; j < institution[i].schools.length; j++) {
                let school = await SchoolController.getSchool(institution[i].schools[j]);
                let totalSchoolsStats = { _id: school._id, name: school.name, totalViews: (await SchoolController.cms(school._id)).total, subjects: []};
                for (let k = 0; k < school.subjects.length; k++) {
                    let subject = await SubjectController.getSubject(school.subjects[k]);
                    let totalSubjectStats = { _id: subject._id, name: subject.name, totalViews: (await SubjectController.cms(subject._id)).total, lectures: []};
                    for (let l = 0; l < subject.lectures.length; l++) {
                        let lecture = await LectureController.getLecture(subject.lectures[l]);
                        let totalLectureStats = { _id: lecture._id, name: lecture.name, totalViews: (await LectureController.cms(lecture._id)).total, videos: []};
                        for (let m = 0; m < lecture.videos.length; m++) {
                            let video = await Video.findOne({_id: lecture.videos[m]});
                            totalLectureStats.videos.push({ _id: video._id, name: 'TODO', totalViews: video.views })
                        }
                        totalSubjectStats.lectures.push(totalLectureStats);
                    }
                    totalSchoolsStats.subjects.push(totalSubjectStats);
                }
                totalInstitutionStats.schools.push(totalSchoolsStats) ;
            }
            result.totalViews += totalInstitutionStats.totalViews;
            result.institutions.push(totalInstitutionStats);
        }

        return result;
    }

}

module;.exports = InstitutionController;