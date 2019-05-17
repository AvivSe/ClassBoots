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

    static async searchLecture(body) {

        try {
            if (!body.date)
                body.date = new Date(2015, 1, 1);
            return await Lecture.find(
                {
                    $and: [
                        {
                            $or: [{name: {$regex: body.generalSearch, $options: 'i'}},
                                {description: {$regex: body.generalSearch, $options: 'i'}}]
                        },
                        {lecturer: {$regex: body.lecturer, $options: 'i'}},
                        {date: {$gte: body.date}}
                    ]
                },
                async (err, docs) => {
                    if (err)
                        console.log(err);
                }).then(async x => {
                let doc = [];
                for (let i = 0; i < x.length; i++) {
                    // console.log(docs[i]);
                    doc[i] = await LectureController.getLecture(x[i]);
                }
                return doc;
            }).then(async lectures => {
                if (body.school != null) {
                    let schools = await School.find({name: {$regex: body.school, $options: 'i'}},
                        async (err, docs) => {
                            if (err)
                                console.log(err);
                        }).then(docs => {
                        for (let i = 0; i < docs.length; i++) {
                            docs[i] = docs[i]._id;
                        }
                        return docs;
                    }).then(async docs => {
                        let schoolfilter = [];
                        for (let i = 0; i < lectures.length; i++) {
                            let x = await SubjectController.getSubject(lectures[i].subjectid);
                            for (let j = 0; j < docs.length; j++) {
                                if (docs[j].toString() == x.schoolid.toString()) {
                                    schoolfilter[i] = lectures[i];
                                }
                            }
                        }
                        return schoolfilter;
                    });
                    return schools;
                }
                //console.log(lectures);
                return lectures;
            });
        } catch (err) {
            errorsController.logger({error: 'searchLecture', description: err});
            return {error: true, description: 'searchLecture: ' + err};
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
