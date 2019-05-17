const SearchController = require('../../controllers/searchController');
const checkAuth = require('../../utils/check-auth');
const {admin} = require('../../utils/Role');

const defineRoutes = router => {

    router.post('', async function (req, res) {
        let result = {};
        if (!req.body.generalSearch)
            result = {error: true, description: "you are searching nothing!"};
        else
            result = await SearchController.searchLecture(req.body);
        res.status(result ? 200 : 400).send(result);
    });

    router.post('/users', checkAuth, admin, async function (req, res) {
        let result = {};
        if (!req.body.generalSearch)
            result = {error: true, description: "you are searching nothing!"};
        else
            result = await SearchController.searchUsers(req.body);
        res.status(result ? 200 : 400).send(result);
    });

    router.get('/statistic', async function (req, res) {
        let result = await SearchController.getStatistic();
        res.status(result ? 200 : 400).send(result);
    });

    return router;
};

module.exports = defineRoutes;
