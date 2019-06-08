const SchoolController = require('../../controllers/schoolController');
const InstitutionController = require('../../controllers/institutionController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');
const {schoolPermission, institutionPermission} = require('../../utils/check-permission');

const defineRoutes = router => {

    router.get('/:id/cms', async (req, res) => {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you do\'nt have validation'};
        else
            result = await SchoolController.cms(req.params.id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.post('/check', checkAuth, schoolPermission, async function (req, res) {
        res.status(200).send({isAuth: true});
    });

    router.post('', checkAuth, institutionPermission, async function (req, res) {
        let result = {};
        if (!req.body.institutionid || !req.body.name) {
            result = {error: true, description: 'you don\'t have validation'};
        } else {
            var send = {};
            send.institutionid = req.body.institutionid;
            result = await SchoolController.createSchool(req.body);
            if (!result.error) {
                send.schoolid = result._id;
                InstitutionController.addSchool(send);
            }
        }
        res.status(result.error ? 400 : 201).send(result);
    });

    router.get('', async function (req, res) {
        let result = await SchoolController.getSchoolCollection();
        res.status(result.error ? 400 : 200).send(result);
    });

    router.delete('', checkAuth, institutionPermission, async function (req, res) {
        let result = {};
        if (!req.body._id || !req.body.institutionid)
            result = {error: true, description: 'you don\'t have validation'};
        else {
            result = await SchoolController.deleteSchool(req.body._id);
            if (!result.error)
                InstitutionController.deleteSchool({institutionid: req.body.institutionid, schoolid: req.body._id});
        }
        res.status(result.error ? 400 : 200).send(result);
    });

    router.put('', checkAuth, schoolPermission, async function (req, res) {
        let result = {};
        if (!req.body._id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SchoolController.updateSchool(req.body);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.post('/addsubject', checkAuth, schoolPermission, async function (req, res) {
        let result = {};
        if (!req.body.schoolid || !req.body.subjectid)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SchoolController.addSubject(req.body);
        res.status(result.error ? 400 : 201).send(result);
    });

    router.get('/getsubjects/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SchoolController.getSubjects(req.params.id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.post('/addpermission', checkAuth, schoolPermission, async function (req, res) {
        let result = {};
        if (!req.body.schoolid || !req.body.userid)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SchoolController.addpermission(req.body);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.delete('/permission', checkAuth, schoolPermission, async function (req, res) {
        let result = {};
        if (!req.body.schoolid || !req.body.userid)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SchoolController.deletepermission(req.body);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await SchoolController.getSchool(req.params.id);
        res.status(result.error ? 400 : 200).send(result);
    });

    return router;
};

module.exports = defineRoutes;
