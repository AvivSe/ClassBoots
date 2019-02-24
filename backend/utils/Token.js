const jwt = require('jsonwebtoken');
class Token {
    constructor(user) {
        this._token = jwt.sign({user:user}, 'todo_edit_this_secret', {expiresIn: "1h"});
        this._profile = { email: user.email , role: user.role };
    }
}

module.exports = Token;