const Video = require('../models/video');
const History = require('../models/history');
const errorsController = require('./errorsController');
const YoutubeScraper = require('../utils/yt-scraper');
const createCountMinSketch = require("count-min-sketch");

var Sketch = (function () {
    var instance;

    async function createInstance() {
        let sketch = createCountMinSketch();
        let videos = await VideoController.getVideoCollection();
        videos.forEach(v => {
            sketch.update(v.lectureid, v.views);
        });
        return sketch;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

class VideoController {

    static async getVideoCollection() {
        try {
            let result;
            let invalid = {};
            result = await Video.find(err => {
                if (err) {
                    invalid = {error: true, description: err};
                    errorsController.logger({error: 'getInstitutionCollection', description: err});
                }
            });
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'getVideoCollection', description: e});
            return {error: true, description: 'getVideoCollection: ' + e};
        }
    };

    static async createVideo(body) {
        try {
            let result = {};
            let video = new Video(body);
            YoutubeScraper.getCommentsAsync(body.reference, result => {
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
            return result.error === undefined ? video : result;
        } catch (e) {
            errorsController.logger({error: 'createVideo', description: e});
            return {error: true, description: 'createVideo: ' + e};
        }
    };

    static async getVideo(id, userid) {
        try {
            let result = null;
            await Video.findById(id).then(async video => {

                Sketch.getInstance().then(sketch => {
                    sketch.update(video.lectureid, 1);
                });

                result = video;
                if (userid != null) {
                    await History.findOne({user: userid}).then(async history => {
                        if (!history) {
                            var history =new History({user:userid});
                            history.save();
                        }
                        await History.findOne({user: userid}, function (err, history) {
                            for (var i = 0; i < history.watches.length; i++)
                                if (history.watches[i].video == id)
                                    break;
                            if (i < history.watches.length) {
                                let lastdate = history.watches[i].date;
                                history.watches[i].date = Date.now();
                                let secondeswatchAgo = (history.watches[i].date - lastdate) / 1000;
                                if (secondeswatchAgo > 60) {
                                    VideoController.updateVideo({_id: video._id, views: ++video.views});
                                }
                            } else history.watches[i] = {video: id, date: Date.now()};
                            history.save();
                        });

                    });
                }
                let secondesAgo = (new Date() - video.lastscrape) / 1000;
                if (secondesAgo > 86400) {
                    Video.findByIdAndUpdate(
                        video._id,
                        {lastscrape: new Date()},
                        {upsert: true, new: true}).then(vid => {
                        //TODO: duplicate code
                        YoutubeScraper.getCommentsAsync(vid.reference, result => {
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
                result = {error: true, description: err + "-cannot find"};
                errorsController.logger({error: 'getVideo', description: err});
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'getVideo', description: e});
            return {error: true, description: 'getVideo: ' + e};
        }
    };

    static async deleteVideo(id) {
        try {
            let result = {Deleted:id};
            await Video.findByIdAndDelete(id).catch(err => {
                result = {error: true, description: err};
                errorsController.logger({error: 'deleteVideo', description: err});
            });
            return result;
        } catch (e) {
            errorsController.logger({error: 'deleteVideo', description: e});
            return {error: true, description: 'deleteVideo: ' + e};
        }
    };

    static async updateVideo(body) {
        try {
            let invalid = {};
            await Video.findByIdAndUpdate(body._id, body, {}).catch(err => {
                invalid = {error: true, description: err};
                errorsController.logger({error: 'updateVideo', description: err});
            });
            return invalid;
        } catch (e) {
            errorsController.logger({error: 'updateVideo', description: e});
            return {error: true, description: 'updateVideo: ' + e};
        }
    }

    static async addComment(body, userid) {
        try {
            let invalid = {};
            body.user = userid;
            let result = await Video.findByIdAndUpdate(
                body.videoid,
                {$addToSet: {"comments": body}},
                {upsert: true},
                (err => {
                    if (err) {
                        invalid = {error: true, description: err};
                        errorsController.logger({error: 'addComment', description: err});
                    }
                }));
            return invalid.error === undefined ? result : invalid;
        } catch (e) {
            errorsController.logger({error: 'addComment', description: e});
            return {error: true, description: 'addComment: ' + e};
        }
    };

    static async deleteComment(body) {
        try {
            let result = await Video.findByIdAndUpdate(
                body.videoid,
                {$pull: {"comments": {_id: body.commentid}}},
                {upsert: true, new: true});
            return result;
        } catch (e) {
            errorsController.logger({error: 'deleteComment', description: e});
            return {error: true, description: 'deleteComment: ' + e};
        }
    };

}


module.exports = {VideoController, Sketch};