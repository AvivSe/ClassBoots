const jwt = require('jsonwebtoken');
/**
 * Created by Aviv Segal on Jan 2019
 */
class Token {
    constructor(user) {
        const expireIn = 48; // hours
        const timeUnit = 'h';
        this._token = jwt.sign({user:user}, 'todo_edit_this_secret', {expiresIn: expireIn + timeUnit});
        this._profile = { email: user.email , role: user.role };
        let expire = new Date();
        //expire.setMinutes(expire.getMinutes() + expireIn);
        expire.setHours(expire.getHours() + expireIn);
        this._expire = expire;
    }
}

module.exports = Token;