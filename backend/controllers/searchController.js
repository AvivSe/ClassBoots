const errorsController = require('./errorsController');
const LectureController = require('./lectureController');
const SubjectController = require('./subjectController');
const SchoolController = require('./schoolController');
const InstitutionController = require('./institutionController');

const Lecture = require('../models/lecture');
const Subject = require('../models/subject');
const School = require('../models/school');
const Institution = require('../models/institution');



class SearchController {

    static async searchLecture(body) {


        // TODO: need to fix
        /*var result = null;
        var idList = null;
        // check validation
        if(body.subject !== undefined && body.subject !== "")
        {
            query = {$and:[{$or:[{name:{$regex: body.lecture, $options: 'i'}},{description:{$regex: body.lecture, $options: 'i'}}]},{subjectid:body.subject}]}
        }
        else if(body.school !== undefined && body.school !== "")
        {
            //idList = await
        }








/*        var result = {};
        var query = {};
        if(body.lecture) {
            query = {$or:[{name:{$regex: body.lecture, $options: 'i'}},{description:{$regex: body.lecture, $options: 'i'}}]}
        }
        result = await Lecture.find(query , function (err, data) {
            if(err) {
                return err
            }
            return data
        });
        console.log(result);*/
        return null;
        /*if(body.institution) {query = {name:{$regex: body.institution, $options: 'i'}}};
        result.institutions = await Institution.find(query , (err, data)=> { return data });
        if(body.school) {query = {name:{$regex: body.school, $options: 'i'}};
        result.schools = await School.find(query , (err, data)=> { return data });
        if(body.subject) {query = {$or:[{name:{$regex: body.subject, $options: 'i'}},{description:{$regex: body.subject, $options: 'i'}}]};}
        result.subjects = await Subject.find(query , (err, data)=> { return data });
        if(body.lecture) {query = {$or:[{name:{$regex: body.lecture, $options: 'i'}},{description:{$regex: body.lecture, $options: 'i'}}]};}
        result.lectures = await Lecture.find(query , (err, data)=> { return data });
        console.log(result);
        return result;*/
    };

}


module.exports = SearchController;
