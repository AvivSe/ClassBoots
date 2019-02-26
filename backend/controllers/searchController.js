const errorsController = require('./errorsController');
const LectureController = require('./lectureController');
const SubjectController = require('./subjectController');
const SchoolController = require('./schoolController');
const InstitutionController = require('./institutionController');
const VideoController = require('./videoController');

const Video = require('../models/video');
const Lecture = require('../models/lecture');
const Subject = require('../models/subject');
const School = require('../models/school');
const Institution = require('../models/institution');

var AhoCorasick = require('node-aho-corasick');


class SearchController {

    static async searchLecture(body) {
        var result = [];
        if(!body.generalSearch)
            return null;
        var result = await Lecture.find(
            {$or:[{name:{$regex: body.generalSearch, $options: 'i'}},{description:{$regex: body.generalSearch, $options: 'i'}}]},
            {$and:[{lecturer:{$regex: body.lecturer, $options: 'i'}},{date:{$gte: body.date}}]},
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
            if(body.school != null)
            {
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
        return await result;
    };


    static async searchcomment(body) {
        let ac = new AhoCorasick();
        let videos = await VideoController.getVideoCollection();
        let comments = [];
        for (let i = 0; i < videos.length; i++) {
            comments = comments.concat(videos[i].comments);
        }
        comments = comments.map(comment=>comment.content);
        var fullText = '';
        for (let i = 0; i < comments.length; i++) {
            fullText = fullText.concat(comments[i],' , ');
        }
        console.log(fullText);
        for (let i = 0; i < body.words.length; i++) {
            ac.add(body.words[i]);
        }
        ac.build();
        var res = ac.search(fullText);
        return res;
    }

    static async getStatistic(body) {
        let result = {};
        result.institutions = await Institution.countDocuments();
        result.schools = await School.countDocuments();
        result.subjects = await Subject.countDocuments();
        result.lectures = await Lecture.countDocuments();
        result.videos = await Video.countDocuments();
        return result;
    }



}


module.exports = SearchController;
