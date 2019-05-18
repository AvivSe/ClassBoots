const UserController = require('../../controllers/userController');
const PrivateMessageController = require('../../controllers/privatemessageController');
const checkAuth = require('../../utils/check-auth');
const Role = require('../../utils/Role');


const defineRoutes = router => {

    router.get('/profile', checkAuth, async function (req, res) {
        if (req.profile) {
            let result = req.profile;
            result.inbox = await PrivateMessageController.getInboxMessages(req.profile.user._id);
            result.outbox = await PrivateMessageController.getOutboxMessages(req.profile.user._id);
            res.status(200).send(result);
        } else {
            res.status(400).send({error: "true", description: "cannot find profile data"});
        }
    });

    router.post('/sendpm', checkAuth, async function (req, res) {
        if (req.profile) {
            let result = {};
            if (!req.body.to || !req.body.message) {
                result = {error: true, description: 'you don\'t have validation'};
            } else {
                let to = await UserController.getUser(req.body.to);
                if (!to.error) {
                    req.body.to = to._id;
                    req.body.from = req.profile.user._id;
                    result = await PrivateMessageController.sendPrivateMessage(req.body);
                } else {
                    result = {error: "true", description: "cannot find email reciver"};
                }
            }
            res.status(result.error ? 400 : 201).send(result);
        } else {
            res.status(400).send({error: "true", description: "cannot find profile data"});
        }


    });

    router.get('/history/videos', checkAuth, async function (req, res) {
        if (req.profile) {
            let result = await UserController.getUserWatchesHistory(req.profile.user._id);
            res.status(result ? 200 : 400).send(result);
        } else {
            res.status(400).send({error: "true", description: "cannot find profile data"});
        }
    });

    router.get('/:email', checkAuth, Role.admin, async function (req, res) {
        let result = await UserController.getUser(req.params.email);
        res.status(200).send(result);

    });

    router.post('/register', async function (req, res) {
        let result = await UserController.createUser(req.body);
        res.status(result ? 201 : 400).send(result);

    });

    router.post('/login', async function (req, res) {
        if (req.body.email === undefined || req.body.password === undefined)
            res.status(400).send({"ERROR": "Bad Request"});
        else {
            let result = await UserController.login(req.body);
            res.status(200).send(result);
        }

    });

    router.get('', checkAuth, Role.admin, async function (req, res) {
        let result = await UserController.getUserCollection(req.body);
        res.status(result.status).send(result.data);

    });

    return router;
};

module.exports = defineRoutes;
