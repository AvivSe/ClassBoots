const jwt = require('jsonwebtoken');

/**
 * Created by Aviv Segal on Jan 2019
 */
class Token {
    constructor(user) {
        this._token = jwt.sign({user:user}, 'todo_edit_this_secret', {expiresIn: "1h"});
        // decode this why:
        console.log(jwt.decode(this._token));
    }
}

module.exports = Token;