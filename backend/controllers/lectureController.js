const Lecture = require('../models/lecture');
const VideoController = require('../controllers/videoController');

class LectureController {
    static async getLectureCollection(body) {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await Lecture.find(err => {
            if (err) {
                result = invalid;
            }
        });
        return result;
    };

    static async createLecture(body) {
        let result = null;
        // TODO: Check body schema
        const lecture = new Lecture(body);

        await lecture.create(err => {
            if (err) {
                result = err;
            } else {
                result = "Added";
            }
        });
        return result;
    };


    static async getLecture(id) {
        let result = null;

        await Lecture.findById(id).then(lecture => {
            if (lecture)
                result = lecture;
            else
                result = {"ERROR":"lecture not found"};
        }).catch(err => {
            result = err;
        });
        return result;
    };

    static async deleteLecture(id) {
        let result = null;
        await Lecture.findByIdAndDelete(id).then(lecture => {
            if (lecture)
                for(let video in lecture.videos){
                    result = VideoController.deleteVideo(video);
                    if(result)
                        break;
                }
            else
                result = {"ERROR":"lecture not found"};
        }).catch(err => {
            result = err;
        });
        return result;
    };

}

module.exports = LectureController;