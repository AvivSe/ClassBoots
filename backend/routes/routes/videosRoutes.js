const {VideoController} = require('../../controllers/videoController');
const LectureController = require('../../controllers/lectureController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');
const {videoPermission, lecturePermission} = require('../../utils/check-permission');


const defineRoutes = router => {

    router.delete('/:videoId/deletecomment/:commentId', checkAuth, admin, async function (req, res) {
        let result = await VideoController.deleteComment(req.params.videoId, req.params.commentId);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/getRelatedVideos/:id', checkAuth, async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'please include id param'};
        else
            result = await VideoController.getRelatedVideos(req.params.id);

        res.status(result.error ? 400 : 200).send(result);
    });

    router.post('/check', videoPermission, async function (req, res) {
        res.status(200).send({isAuth: true});
    });


    router.post('', checkAuth, lecturePermission, async function (req, res) {
        let result = {};
        if (!req.body.reference || !req.body.position || !req.body.lectureid || !req.body.name) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            var send = {};
            send.lectureid = req.body.lectureid;
            result = await VideoController.createVideo(req.body);
            if (!result.error) {
                send.videoid = result._id;
                LectureController.addVideo(send);
            }
        }
        res.status(result.error ? 400 : 201).send(result);
    });

    router.get('', checkAuth, admin, async function (req, res) {
        let result = await VideoController.getVideoCollection();
        res.status(result.error ? 400 : 200).send(result);
    });

    router.delete('', checkAuth, videoPermission, async function (req, res) {
        let result = {};
        if (!req.body.lectureid || req.body._id)
            result = {error: true, description: 'you don\'t have validation'};
        else {
            result = await VideoController.deleteVideo(req.body._id);
            if (!result.error)
                LectureController.deleteVideo({lectureid: req.body.lectureid, videoid: req.body._id});
        }
        res.status(result.error ? 400 : 200).send(result);
    });

    router.put('', checkAuth, videoPermission, async function (req, res) {
        let result = {};
        if (!req.body._id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await VideoController.updateVideo(req.body);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.post('/addcomment', checkAuth, async function (req, res) {
        let result = {};
        if (!req.body.videoid)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await VideoController.addComment(req.body, req.profile.user._id, req.profile.user.email);
        res.status(result.error ? 400 : 200).send(result);
    });



    router.post('/like', checkAuth, async function (req, res) {
        let result = {};
        if (!req.body.videoid) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            req.body.userid = req.profile.user._id;
            result = await VideoController.likeVideo(req.body);
        }
        res.status(result.error ? 400 : 201).send(result);
    });

    router.post('/dislike', checkAuth, async function (req, res) {
        let result = {};
        if (!req.body.videoid) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            req.body.userid = req.profile.user._id;
            result = await VideoController.disLikeVideo(req.body);
        }
        res.status(result.error ? 400 : 200).send(result);
    });


    router.get('/:id/like', checkAuth, async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await VideoController.likeVideo(req.params.id, req.profile.user._id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/:id/dislike', checkAuth, async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await VideoController.dislikeVideo(req.params.id, req.profile.user._id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/:id/unlike', checkAuth, async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await VideoController.unLikeVideo(req.params.id, req.profile.user._id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/:id/undislike', checkAuth, async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await VideoController.unDislikeVideo(req.params.id, req.profile.user._id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/:id', checkAuth, async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await VideoController.getVideo(req.params.id, req.profile.user._id);
        res.status(result.error ? 400 : 200).send(result);
    });


    return router;
};

module.exports = defineRoutes;
