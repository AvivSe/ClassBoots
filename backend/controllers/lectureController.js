const Lecture = require('../models/lecture');
const Video = require('../models/video');
const {VideoController, Sketch} = require('./videoController');
const errorsController = require('./errorsController');
const YoutubeScraper = require('../utils/yt-scraper');

class LectureController {

    static addYTPlaylistToLectureByYTPLID(lectureID, ytplID) {
        try {
            YoutubeScraper.getPlaylistAsync(ytplID, (playlist)=>{
                var x = 0;
                Lecture.findById(lectureID).then(lecture => {
                    if (lecture) {
                        playlist.forEach((v)=>{
                            //TODO: If there is already some video with same reference, dont add the video.
                            let newVideo = new Video({ name: v.name, reference: v.id, lectureid: lectureID, position:  x++ });
                            console.log(newVideo);
                            VideoController.createVideo(newVideo);
                            LectureController.addVideo({ lectureid: lectureID, videoid: newVideo._id });
                        });
                    }
                }).catch(err => {
                    errorsController.logger({error:'addYTPlaylistToLectureByYTPLID',description:err});
                });
            });
        }
        catch (e) {
            errorsController.logger({error:'addYTPlaylistToLectureByYTPLID',description:e});
            return {error:true,description:'addYTPlaylistToLectureByYTPLID: '+e};
        }

    }

    static async getLectureCollection() {

        try {
            let result;
            let invalid = {};
            result = await Lecture.find(err => {
                if (err) {
                    invalid = {error:true,description:err};
                    errorsController.logger({error:'getLectureCollection',description:err});
                }
            });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:'getLectureCollection',description:e});
            return {error:true,description:'getLectureCollection: '+e};
        }

    };

    static async createLecture(body) {
        try {
            let result = {};
            let lecture = new Lecture(body);
            await lecture.save(err => {
                if (err) {
                    result = {error:true,description:err};
                    errorsController.logger({error:'createLecture',description:err});
                }
            });
            return result.error===undefined?lecture:result;
        }
        catch (e) {
            errorsController.logger({error:'createLecture',description:e});
            return {error:true,description:'createLecture: '+e};
        }
    }

    static async getLecture(id) {
        try {
            let result = null;
            await Lecture.findById(id).then(lecture => {
                if (lecture)
                    result = lecture;
                else
                    result = {error:true,description:'lecture not found'};
            }).catch(err => {
                result = {error:true,description:err};
                errorsController.logger({error:'getLecture',description:err});
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:'getLecture',description:e});
            return {error:true,description:'getLecture: '+e};
        }

    };

    static async getVideos(id) {
        try {
            let result = [];
            await this.getLecture(id).then(async lecture=>{
                for (let i = 0; i < lecture.videos.length; i++) {
                    await VideoController.getVideo(lecture.videos[i],null).then(async video=>{
                        result.push(video);
                    });
                }
            }).catch(async err=>{
                result = {error:true,description:'lecture not found'};
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:'getVideos',description:e});
            return {error:true,description:'getVideos: '+e};
        }

    };

    /**
     * delete lecture and call to remove all videos of this lecture
     * @param id of lecture to be removed.
     * @returns {Promise<*>}
     */
    static async deleteLecture(id) {
        try {
            let result = null;
            await Lecture.findByIdAndDelete(id).then(obj=>{
                result = {Deleted:id};
                obj.videos.forEach(async videoid => {
                    VideoController.deleteVideo(videoid);
                });
            }).catch(err => {
                result = {error:true,description:err};
                errorsController.logger({error:'deleteLecture',description:err});
            });
            return result;
        }
        catch (e) {
            errorsController.logger({error:'deleteLecture',description:e});
            return {error:true,description:'deleteLecture: '+e};
        }

    };

    static async updateLecture(body) {
        try {
            let invalid = {};
            await Lecture.findByIdAndUpdate(body._id, body, {}).catch(err => {
                invalid = {error:true,description:err};
                errorsController.logger({error:'updateLecture',description:err});
            });
            return invalid;
        }
        catch (e) {
            errorsController.logger({error:'updateLecture',description:e});
            return {error:true,description:'updateLecture: '+e};
        }

    }

    static async addVideo(body) {
        try {
            let invalid = {};
            let lecture = await this.getLecture(body.lectureid);
            if(lecture.error)
                return lecture;
            var video = await VideoController.getVideo(body.videoid);
            if(video.error)
                return video;
            var result = await Lecture.findByIdAndUpdate(
                body.lectureid,
                { $addToSet: {"videos": body.videoid}},
                { upsert: true},(err,lecture)=>{
                    if(err){
                        invalid = {error:true,description:err};
                        errorsController.logger({error:'addVideo',description:err});
                    }
                    if(lecture){
                        VideoController.updateVideo({_id:body.videoid,lectureid:lecture._id});
                    }
                });
            return invalid.error===undefined?result:invalid;
        }
        catch (e) {
            errorsController.logger({error:'addVideo',description:e});
            return {error:true,description:'addVideo: '+e};
        }
    };

    // TODO: don't need now! but need to fix
    static async deleteVideo(body) {
        if(!body.lectureid || !body.videoid){
            return {error:true,description:'you don\'t have validation'};
        }
        try {
            Lecture.findByIdAndUpdate(
                body.lectureid,
                { $pull: {"videos": body.videoid }},
                { upsert: true, new: true },
                err=>{
                    if(err) errorsController.logger("Delete Video from Lecture",err);
                });
        }
        catch (e) {
            errorsController.logger({error:'deleteVideo',description:e});
            return {error:true,description:'deleteVideo: '+e};
        }

    };

    static async cms(lectureID) {
        try {
            let result = "";
            await Sketch.getInstance().then(sketch=> {
                result = sketch.query(lectureID);
            });

            return {total: result};
        }
        catch (e) {
            errorsController.logger({error:'cms',description:e});
            return {error:true,description:'cms: '+e};
        }
    }

    static async stats() {
        try {
            let lectures = await LectureController.getLectureCollection();
            let totalVideos = 0;
            if(lectures) {
                totalVideos = lectures.map(lec=>lec.videos.length).reduce((sum, current)=>sum+current);
            }
            return { totalVideos:  totalVideos };
        }
        catch (e) {
            errorsController.logger({error:'stats',description:e});
            return {error:true,description:'stats: '+e};
        }

    }
}

module.exports =  LectureController;