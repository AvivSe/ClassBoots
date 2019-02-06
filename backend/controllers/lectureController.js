const Lecture = require('../models/lecture');
const VideoController = require('../controllers/videoController');
const errorsController = require('../controllers/errorsController');

class LectureController {
    static async getLectureCollection() {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await Lecture.find(err => {
            if (err) {//send to function error
                result = invalid;
                errorsController.logger(err,result);

            }
        });
        return result;
    };

    static async createLecture(body) {
        var result = null;
        delete body.subjectid;
        var lecture = new Lecture(body);
        await lecture.save((err, lecture)=> {
            if (err) {
                result = err;
                errorsController.logger(err,result);
            }
        });
        return result?result:lecture;
    }

    static async getLecture(id) {
        let result = null;

        await Lecture.findById(id).then(lecture => {
            if (lecture)
                result = lecture;
            else
                result = {"ERROR":"lecture not found"};
        }).catch(err => {
            result = err;
            errorsController.logger(err,result);
        });
        return result;
    };

    static async getVideos(id) {
        let result = await this.getLecture(id);
        if(result.ERROR)
            return result;
        var myvideos = [];
        for (let i = 0; i < result.videos.length; i++) {
            let video = await VideoController.getVideo(result.videos[i]);
            myvideos.push(video);
        }
        return myvideos;
    };

    /**
     * delete lecture and call to remove all videos of this lecture
     * @param id of lecture to be removed.
     * @returns {Promise<*>}
     */
    static async deleteLecture(id) {
        let result = null;
        let obj = await Lecture.findByIdAndDelete(id);
        if(!result)
        {
            obj.videos.forEach(async videoId => {
                result = await VideoController.deleteVideo(videoId);
                if (result) {
                    console.log(result);
                }
            });
        }
        return result;
    };

    static async addVideo(body) {
        var result = await Lecture.findByIdAndUpdate(
            body.lectureid,
            { $push: {"videos": body.videoid}},
            { upsert: true, new: true });
        return result;
    };

}

module.exports = LectureController;