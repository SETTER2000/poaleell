// /**
//  * Created by PhpStorm.
//  * Company: Appalachian Ltd.
//  * Developer: SETTER
//  * Suite: appalachi.ru
//  * Email: info@appalachi.ru
//  * Date: 26.12.2016
//  * Time: 23:42
//  */
// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy,
//     bcrypt = require('bcrypt');
//
// passport.use(new LocalStrategy(function (username, password, done) {
//     User.findOne({
//         login: login
//     }, function (err, user) {
//         if (err) {
//             return done(err);
//         }
//         if (!user) {
//             return done(null, false, {message: 'Credentials not recognised!'});
//         }
//         bcrypt.compare(password, user.password, function (err, res) {
//             if (!res) {
//                 return done(null, false, {message: 'Credentials not recognisesd!'})
//             }
//             return done(null,user,'Signin success');
//         });
//     });
// }));