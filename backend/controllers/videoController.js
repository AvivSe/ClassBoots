const Video = require('../models/video');
const errorsController = require('./errorsController');
const LectureController = require('./lectureController');
const YoutubeCommentsScraper = require('../utils/yt-comment-scraper');

class VideoController {
    static async getVideoCollection() {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await Video.find(err => {
            if (err) {
                result = invalid;
                errorsController.logger(err,result);

            }
        });
        return result;
    };

    static async createVideo(body) {
        const video = new Video(body);
        YoutubeCommentsScraper.getCommentsAsync(body.reference);

        await video.save(err => {
            if (err) {
                errorsController.logger("Create Video",err);
            }
        });
        return video;
    };

    static async getVideo(id) {
        let result = null;
        await Video.findOne({_id: id}).then(video => {
            if (video)
                result = video;
            else
                result = {"ERROR":"video not found"};
        }).catch(err => {
            result = {"ERROR":"video not found"};
            errorsController.logger("Get Subject",err);
        });
        return result;
    };

    static async deleteVideo(id) {
        let result = null;
        await Video.findByIdAndDelete(id).catch(err => {
            result = err;
            errorsController.logger(err,result);
        });
        return result;
    };

    static async updateVideo(body) {
        let result = await Video.findByIdAndUpdate(body._id, body, {new: true}, err => {
            if (err) errorsController.logger("update Video",err);
        });
        return result;
    }

    static async addComment(body) {

        var result = await Video.findByIdAndUpdate(
            body.videoid,
            { $push: {"comments": body}},
            { upsert: true, new: true });
        return result;
    };

    static async deleteComment(body) {
        var result = await Video.findByIdAndUpdate(
            body.videoid,
            { $pull: {"comments": {  _id: body.commentid }}},
            { upsert: true, new: true });
        return result;
    };

    static async checkPermission(body) {
        var result = await this.getVideo(body.videoid);
        console.log(LectureController);
        return await result.ERROR === undefined?LectureController.checkPermission({lectureid:result.lectureid,userid:body.userid}).finally(()=>{}):false;
    };

}

module.exports = VideoController;