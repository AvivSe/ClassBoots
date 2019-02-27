const Error = require('../models/errors');


class errorsController {


    static logger(body) {
        var error = new Error(body);
        error.save();
    };

}
module.exports = errorsController;
