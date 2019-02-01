const jwt = require('jsonwebtoken');

/**
 * Created by Aviv Segal on Jan 2019
 */
class Token {
    constructor(user) {
        user.password = "******";
        this._token = jwt.sign({data:user}, 'todo_edit_this_secret', {expiresIn: "1h"});
    }
}

module.exports = Token;