const jwt = require('jsonwebtoken');
/**
 * Created by Aviv Segal on Jan 2019
 */
class Token {
    constructor(user) {
        this._token = jwt.sign({user:user}, 'todo_edit_this_secret', {expiresIn: "1h"});
        this._profile = { email: user.email , role: user.role };
    }
}

module.exports = Token;