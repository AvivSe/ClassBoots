const errorsController = require('./errorsController');
const {LectureController} = require('./lectureController');
const SubjectController = require('./subjectController');
const SchoolController = require('./schoolController');
const InstitutionController = require('./institutionController');

const Lecture = require('../models/lecture');
const Subject = require('../models/subject');
const School = require('../models/school');
const Institution = require('../models/institution');



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
        //console.log(result);
        // console.log(x+"hi");
       //  Promise.all(result).then(y=>{
       //      console.log(y);
       //  });


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

        /*if(body.institution) {query = {name:{$regex: body.institution, $options: 'i'}}};
        result.institutions = await Institution.find(query , (err, data)=> { return data });
        if(body.school) {query = {name:{$regex: body.school, $options: 'i'}};
        result.schools = await School.find(query , (err, data)=> { return data });
        if(body.subject) {query = {$or:[{name:{$regex: body.subject, $options: 'i'}},{description:{$regex: body.subject, $options: 'i'}}]};}
        result.subjects = await Subject.find(query , (err, data)=> { return data });
        if(body.lecture) {query = {$or:[{name:{$regex: body.lecture, $options: 'i'}},{description:{$regex: body.lecture, $options: 'i'}}]};}
        result.lectures = await Lecture.find(query , (err, data)=> { return data });
        console.log(result);*/
        return await result;
    };

}


module.exports = SearchController;
