const Lecture = require('../models/lecture');
const VideoController = require('../controllers/videoController');

class LectureController {
    static async getLectureCollection() {
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
        var result = null;
        var lecture = new Lecture(body);
        await lecture.save(err => {
            if (err)
                result = err;
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

}

module.exports = LectureController;