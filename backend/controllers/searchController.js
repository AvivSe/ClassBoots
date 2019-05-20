const errorsController = require('./errorsController');
const {VideoController} = require('./videoController');
const LectureController = require('./lectureController');
const SubjectController = require('./subjectController');

const Video = require('../models/video');
const Lecture = require('../models/lecture');
const Subject = require('../models/subject');
const School = require('../models/school');
const Institution = require('../models/institution');
const User = require('../models/user');


class SearchController {

    static async search(body) { // body.generalSearch

        try {
            let videos = await Video.find({name: {$regex: body.generalSearch, $options: 'i'}}, async (err, docs) => {
                console.log("err: "+err+", docs: "+docs);
                if (err) {
                    errorsController.logger({error: 'search in video', description: err});
                    return {error: true, description: 'search in video: ' + err};
                }
                return await docs.forEach(doc=>{
                    doc.type="video";
                });
            });
            console.log(video);
            return videos;


        } catch (err) {
            errorsController.logger({error: 'search', description: err});
            return {error: true, description: 'search: ' + err};
        }
    };


    static async getStatistic(body) {

        try {
            let result = {};
            result.institutions = await Institution.countDocuments();
            result.schools = await School.countDocuments();
            result.subjects = await Subject.countDocuments();
            result.lectures = await Lecture.countDocuments();
            result.videos = await Video.countDocuments();
            return result;
        } catch (err) {
            errorsController.logger({error: 'getStatistic', description: err});
            return {error: true, description: 'getStatistic: ' + err};
        }

    }

    static async searchUsers(body) {

        try {
            if (!body.regdate)
                body.regdate = new Date(2015, 1, 1);
            return await User.find(
                {
                    $and: [
                        {
                            $or: [{email: {$regex: body.generalSearch, $options: 'i'}},
                                {firstName: {$regex: body.generalSearch, $options: 'i'}}]
                        },
                        {role: {$regex: body.role, $options: 'i'}},
                        {regDate: {$gte: body.regdate}},
                        {email: {$regex: body.suffix, $options: 'i'}}
                    ]
                },
                async (err, docs) => {
                    if (err) {
                        errorsController.logger({error: 'searchUsers', description: err});
                        return {error: true, description: 'searchUsers: ' + err};
                    }
                    return docs;
                }).then(async docs => {
                if (docs.error)
                    return docs;
                let users = [];
                for (let i = 0; i < docs.length; i++)
                    users[i] = await User.findById(docs[i]._id);
                return users;
            });
        } catch (err) {
            errorsController.logger({error: 'searchUsers', description: err});
            return {error: true, description: 'searchUsers: ' + err};
        }

    };


}


module.exports = SearchController;
