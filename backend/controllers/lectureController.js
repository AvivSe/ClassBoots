const Lecture = require('../models/lecture');
const VideoController = require('./videoController');
const errorsController = require('./errorsController');
console.log('Lecture connect');

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
        var lecture = new Lecture(body);
        await lecture.save((err)=> {
            if (err) {
                errorsController.logger("Create Lecture",err);
            }
        });
        return lecture;
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
            if(video.ERROR !== undefined)
                this.deleteVideo({lectureid:id,videoid:result.videos[i]});
            else myvideos.push(video);
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
        obj.videos.forEach(async videoId => {
            result = await VideoController.deleteVideo(videoId);
            if (result) {
                console.log(result);
            }
        });
        return result;
    };

    static async updateLecture(body) {
        let result = await Lecture.findByIdAndUpdate(body._id, body, {new: true}, err => {
            if (err) errorsController.logger("update Lecture",err);
        });
        return result;
    }

    static async addVideo(body) {
        var result = await Lecture.findByIdAndUpdate(
            body.lectureid,
            { $push: {"videos": body.videoid}},
            { upsert: true, new: true });
        return result;
    };

    static async deleteVideo(body) {
        Lecture.findByIdAndUpdate(
            body.lectureid,
            { $pull: {"videos": body.videoid }},
            { upsert: true, new: true },
            err=>{
                if(err) errorsController.logger("Delete Video from Lecture",err);
            });
    };

}

module.exports = LectureController;