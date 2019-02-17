const Video = require('../models/video');
const errorsController = require('./errorsController');
const YoutubeCommentsScraper = require('../utils/yt-comment-scraper');
console.log('Video connect');

class VideoController {

    static async getVideoCollection() {
        let result = null;
        const invalid = "ERROR";
        // TODO: error handler
        // TODO: we can use body as filters.
        result = await Video.find(err => {
            if (err) {
                result = invalid;
                errorsController.logger(err, result);

            }
        });
        return result;
    };

    static async createVideo(body) {
        const video = new Video(body);
        //TODO: duplicate code

        YoutubeCommentsScraper.getCommentsAsync(body.reference, result => {
            Video.findByIdAndUpdate(
                video._id,
                {$push: {"ytcomment": result}},
                {upsert: true, new: true}).then(x => {
            });
        });
        await video.save(err => {
            if (err) {
                errorsController.logger("Create Video", err);
            }
        });
        return video;
    };

    static async getVideo(id) {
        let result = null;
        await Video.findOne({_id: id}).then(video => {
            if (video) {
                result = video;
                let secondesAgo = (new Date() - video.lastscrape) / 1000;
                if (secondesAgo > 60) {
                    Video.findByIdAndUpdate(
                        video._id,
                        {lastscrape: new Date()},
                        {upsert: true, new: true}).then(vid => {
                        //TODO: duplicate code
                        YoutubeCommentsScraper.getCommentsAsync(vid.reference, result => {
                            if (!vid.ytcomment.find(c => {
                                return (c.content === result.content && c.author === result.author);
                            })) {
                                Video.findByIdAndUpdate(
                                    vid._id,
                                    {$push: {"ytcomment": result}, lastscrape: new Date()},
                                    {upsert: true, new: true}).then(ignore => {
                                });
                            } else {
                                console.log("already exist");
                            }

                        });
                    });

                } else {
                    console.log("dont wanna update because so young :" + secondesAgo);

                }

            } else
                result = {"ERROR": "video not found"};
        }).catch(err => {
            result = {"ERROR": "video not found"};
            errorsController.logger("Get Subject", err);
        });
        return result;
    };

    static async deleteVideo(id) {
        let result = null;
        await Video.findByIdAndDelete(id).catch(err => {
            result = err;
            errorsController.logger(err, result);
        });
        return result;
    };

    static async updateVideo(body) {
        let result = await Video.findByIdAndUpdate(body._id, body, {new: true}, err => {
            if (err) errorsController.logger("update Video", err);
        });
        return result;
    }

    static async addComment(body) {
        var result = await Video.findByIdAndUpdate(
            body.videoid,
            {$push: {"comments": body}},
            {upsert: true, new: true});
        return result;
    };

    static async deleteComment(body) {
        var result = await Video.findByIdAndUpdate(
            body.videoid,
            {$pull: {"comments": {_id: body.commentid}}},
            {upsert: true, new: true});
        return result;
    };

}


module.exports = VideoController;