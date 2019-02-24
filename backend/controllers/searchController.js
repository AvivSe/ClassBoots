const errorsController = require('./errorsController');
const LectureController = require('./lectureController');
const Lecture = require('../models/lecture');


console.log('Search connect');

class SearchController {

    static async searchLecture(body) {
        var result = null;
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
        console.log(result);
        return result;
    };

}


module.exports = SearchController;
