const errorsController = require('./errorsController');
const LectureController = require('./lectureController');
const Lecture = require('../models/lecture');


console.log('Search connect');

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
    };

}


module.exports = SearchController;
