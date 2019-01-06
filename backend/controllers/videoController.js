const Video = require('../models/institution');

class VideoController {
    static async getVideoCollection(body) {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await Video.find(err => {
            if (err) {
                result = invalid;
            }
        });
        return result;
    };

    static async createVideo(body) {
        let result = null;
        // TODO: Check body schema
        const video = new Video(body);

        await video.create(err => {
            if (err) {
                result = err;
            } else {
                result = "Added";
            }
        });
        return result;
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
        });
        return result;
    };

    static async deleteVideo(id) {
        let result = null;
        await Video.findByIdAndRemove(id).catch(err => {
            result = err;
        });
        return result;
    };

}

module.exports = VideoController;