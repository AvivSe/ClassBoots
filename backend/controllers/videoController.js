const Video = require('../models/video');
const errorsController = require('../controllers/errorsController');


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
        var result = null;
        delete body.lectureid;
        var video = new Video(body);
        await video.save(err => {
            if (err) {
                result = err;
                errorsController.logger(err,result);
            }
        });
        return result?result:video;
    };

    static async getVideo(id) {
        let result = null;
        await Video.findOne({_id: id}).then(video => {
            if (video)
                result = video;
            else
                result = {"ERROR":"video not found"};
        }).catch(err => {
            result = err;
            errorsController.logger(err,result);

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

}

module.exports = VideoController;