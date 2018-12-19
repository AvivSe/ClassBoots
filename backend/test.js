const bcrypt = require('bcrypt');
let password = "galpassword";
var hash2 = ':-)';
const Joi = require('joi');

// bcrypt test
// bcrypt.hash(password, 10, async function(err, hash) {
//     if(err) {
//         return console.log(err);
//     }
//     bcrypt.compare(password, hash, (e,result)=>console.log(result));
// });

// joi test

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainAtoms: 2 })
}).with('username', 'birthyear').without('password', 'access_token');

// Return result.
//const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
// result.error === null -> valid

// You can also pass a callback which will be called synchronously with the validation result.
//Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { });  // err === null -> valid

Joi.validate({ username: 'abc', birthyear: 1994 ,email: 'avivsegal@gmail.com'}, schema, (err,v)=>{
    if(err) console.log(err);
    else console.log(true);
});