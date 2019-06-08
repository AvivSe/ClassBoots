const contactusmsgController = require('../../controllers/contactusmsgController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');

const defineRoutes = router => {

    router.get('/toggle/:id', checkAuth, admin, async function (req, res) {
        let result = await contactusmsgController.toggleHandled(req.params.id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/:id', checkAuth, admin, async function (req, res) {
        let result = await contactusmsgController.getInboxMessages(req.params.id);
        res.status(result.error ? 400 : 200).send(result);
    });


    router.get('', checkAuth, admin, async function (req, res) {
        let result = await contactusmsgController.getContactUsMsgCollection();
        res.status(result.error ? 400 : 200).send(result);
    });


    router.post('', async function (req, res) {
        let result = {};
        if (!req.body.email || !req.body.message) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {

            result = await contactusmsgController.sendContactMessage(req.body);

        }
        res.status(result.error ? 400 : 201).send(result);
    });
    return router;
};


module.exports = defineRoutes;
