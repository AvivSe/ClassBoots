const Error = require('../models/errors');

console.log('Error connect');

class errorsController {


    static logger(body) {
        var error = new Error(body);
        error.save();
    };

}
module.exports = errorsController;