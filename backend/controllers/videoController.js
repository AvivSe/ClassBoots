const Video = require('../models/video');
const History = require('../models/history');
const errorsController = require('./errorsController');
const YoutubeCommentsScraper = require('../utils/yt-comment-scraper');
console.log('Video connect');

class VideoController {

    static async getVideoCollection() {
        var result;
        var invalid = {};
        result = await Video.find(err => {
            if (err) {
                invalid = {error: true, description: err};
                errorsController.logger({error: 'getInstitutionCollection', description: err});
            }
        });
        return invalid.error === undefined ? result : invalid;
    };

    static async createVideo(body) {
        var result = {};
        var video = new Video(body);
        YoutubeCommentsScraper.getCommentsAsync(body.reference, result => {
            Video.findByIdAndUpdate(
                video._id,
                {$push: {"ytcomment": result}},
                {upsert: true, new: true}).then(x => {
            });
        });
        await video.save(err => {
            if (err) {
                result = {error: true, description: err};
                errorsController.logger({error: 'createVideo', description: err});
            }
        });
        return result.error === undefined ? institution : result;
    };

    static async getVideo(id,userid) {
        let result = null;
        await Video.findById(id).then(video => {
            result = video;
            // History.findAndUpdate({user:userid},
            //     {$addToSet: {watches:id}},
            //     {$upsert:false},
            //     err=>{
            //     if(err) errorsController.logger({error:'getVideo',description:err});
            // });
            let secondesAgo = (new Date() - video.lastscrape) / 1000;
            if (secondesAgo > 60) {
                Video.findByIdAndUpdate(
                    video._id,
                    {lastscrape: new Date(), views:(video.views+1)},
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
        }).catch(err => {
            result = {error: true, description: err};
            errorsController.logger({error: 'getVideo', description: err});
        });
        return result;
    };

    static async deleteVideo(id) {
        let result = null;
        await Video.findByIdAndDelete(id).catch(err => {
            result = {error:true,description:err};
            errorsController.logger({error:'deleteVideo',description:err});
        });
        return result;
    };

    static async updateVideo(body) {
        var invalid = {};
        await Video.findByIdAndUpdate(body._id, body, {}).catch(err => {
            invalid = {error:true,description:err};
            errorsController.logger({error:'updateVideo',description:err});
        });
        return invalid;
    }

    static async addComment(body) {
        var invalid = {};
        var result = await Video.findByIdAndUpdate(
            body.videoid,
            {$addToSet: {"comments": body}},
            {upsert: true},
            (err =>{
                if(err) {
                    invalid = {error: true, description: err};
                    errorsController.logger({error: 'addComment', description: err});
                }
            }));
        return invalid.error === undefined ? result : invalid;
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