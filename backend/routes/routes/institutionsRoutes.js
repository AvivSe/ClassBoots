const InstitutionController = require('../../controllers/institutionController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');
const {institutionPermission} = require('../../utils/check-permission');

const defineRoutes = router => {

    router.get('/:id/cms', async (req, res) => {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you do\'nt have validation'};
        else
            result = await InstitutionController.cms(req.params.id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/getschoolsgs', async function (req, res) {
        let result = await InstitutionController.getSchoolsGB();
        res.status(result.error ? 400 : 200).send(result);
    });


    router.post('/check', checkAuth, institutionPermission, async function (req, res) {
        res.status(200).send({isAuth: true});
    });

    router.post('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body.name || !req.body.suffix || !req.body.address || !req.body.geolocation || !req.body.image)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await InstitutionController.createInstitution(req.body);
        res.status(result.error ? 400 : 201).send(result);
    });

    router.get('', async function (req, res) {
        let result = await InstitutionController.getInstitutionCollection();
        res.status(result.error ? 400 : 200).send(result);
    });

    router.delete('', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body._id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await InstitutionController.deleteInstitution(req.body._id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.put('', checkAuth, institutionPermission, async function (req, res) {
        let result = {};
        if (!req.body._id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await InstitutionController.updateInstitution(req.body);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.post('/addschool', checkAuth, institutionPermission, async function (req, res) {
        let result = {};
        if (!req.body.institutionid || !req.body.schoolid)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await InstitutionController.addSchool(req.body);
        res.status(result.error ? 400 : 201).send(result);
    });


    router.get('/getschools/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await InstitutionController.getSchools(req.params.id);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.post('/permission', checkAuth, institutionPermission, async function (req, res) {
        let result = {};
        if (!req.body.institutionid || !req.body.userid)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await InstitutionController.addpermission(req.body);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.delete('/permission', checkAuth, institutionPermission, async function (req, res) {
        let result = {};
        if (!req.body.institutionid || !req.body.userid)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await InstitutionController.deletepermission(req.body);
        res.status(result.error ? 400 : 200).send(result);
    });

    router.get('/:id', async function (req, res) {
        let result = {};
        if (!req.params.id)
            result = {error: true, description: 'you don\'t have validation'};
        else
            result = await InstitutionController.getInstitution(req.params.id);
        res.status(result.error ? 400 : 200).send(result);
    });

    return router;
};

module.exports = defineRoutes;
