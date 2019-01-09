const Video = require('../models/video');

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
        var result = null;
        var video = new Video(body);
        await video.save(err => {
            if (err)
                result = err;
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
        await Video.findByIdAndDelete(id).catch(err => {
            result = err;
        });
        return result;
    };

    static async testVideo(id) {
        var nid;
        var body = {
            reference:"amit",
            position:3
        }
        var video = new Video(body);
        await video.save();
        nid = video._id;
        /////
        console.log(await Video.findByIdAndDelete(nid));

    };

}

module.exports = VideoController;