/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {


    var async = require('async');
    var Passwords = require('machinepack-passwords');
    var Gravatar = require('machinepack-gravatar');

    //console.log(sails.config.admin.shortName());
    //Video.count().exec(function (err, numVideos) {
    //    if (err) {
    //        return cb(err);
    //    }
    //
    //    if (numVideos > 0) {
    //        console.log('Количество видеозаписей: ', numVideos);
    //        return cb();
    //    }
    //
    //    // TODO: Заполнить базу данных видеороликами с YouTube.
    //    var Youtube = require('machinepack-youtube');
    //
    //    // Список видео Youtube, которые соответствуют указанному поисковому запросу..
    //    Youtube.searchVideos({
    //        query: 'chinese crested dogs puppies',
    //        apiKey: sails.config.google.apiKey,
    //        limit: 15
    //    }).exec({
    //        // Произошла непредвиденная ошибка.
    //        error: function (err) {
    //            console.log('An error:', err);
    //            return cb(err);
    //        },
    //
    //        // OK.
    //        // Листинг 5.8. Маршалинг возвращаемых данных с машины .searchVideos ()
    //        success: function (foundVideos) {
    //            // Итерации по каждому видео с помощью _.each ()
    //            _.each(foundVideos, function (video) {
    //                video.src = 'https://www.youtube.com/embed/' + video.id;
    //                delete video.description;
    //                delete video.publishedAt;
    //                delete video.id;
    //                delete video.url;
    //            });
    //
    //            Video.create(foundVideos).exec(function (err, videoRecordsCreated) {
    //                if (err) {
    //                    return cb(err);
    //                }
    //                console.log(videoRecordsCreated);
    //                return cb();
    //            });
    //        }
    //    });
    //
    //    //console.log('Нет видеозаписей.');
    //
    //});




    // This is to prevent us from pulling our hair out creating test users manually in the app
    // `TEST_USERS` is an array of test users
    //var TEST_USERS = [ {
    //    email: 'admin@gmail.com',
    //    login: 'admin',
    //    firstName:'Admins',
    //    lastName:'Adminov',
    //    patronymicName:'Adminovich',
    //    password: '4211817',
    //    deleted:false,
    //    admin:  true,
    //    kadr:   true,
    //    action: true
    //}];


    //async.each(TEST_USERS, function findOrCreateEachFakeUser(fakeUser, next){
    //
    //    // Check if this fake user already exists via the email property al
    //    User.findOne({
    //        email: fakeUser.email
    //    }).exec(function (err, existingUser){
    //
    //        // This handles errors within the iteratee versus at the end in afterwards
    //        // While I'm in findOrCreateEachFakeUser I can't call cb()
    //        if (err) return next(err);
    //
    //        // if this user already exists...
    //        if (existingUser) {
    //            // then go to the next user
    //            return next();
    //        }
    //
    //        // Otherwise the user doesn't exist in the database.
    //
    //        // Encrypt the password of the test user
    //        Passwords.encryptPassword({
    //            password: fakeUser.password
    //        }).exec({
    //            error: function(err) {
    //                return next(err);
    //            },
    //            success: function(encryptedPassword) {
    //
    //                // Get the gravatar url for the fakeUser
    //                var gravatarURL;
    //                try {
    //                    gravatarURL = Gravatar.getImageUrl({
    //                        emailAddress: fakeUser.email
    //                    }).execSync();
    //
    //                } catch (err) {
    //                    return next(err);
    //                }
    //
    //                // Create a new user record with various stuff we just built
    //                User.create({
    //                    gravatarURL: gravatarURL,
    //                    encryptedPassword: encryptedPassword,
    //                    email: fakeUser.email,
    //                    login: fakeUser.login,
    //                    firstName:fakeUser.firstName,
    //                    lastName:fakeUser.lastName,
    //                    patronymicName:fakeUser.patronymicName,
    //                    deleted: fakeUser.deleted,
    //                    admin: fakeUser.admin,
    //                    kadr: fakeUser.kadr,
    //                    action: fakeUser.action
    //                }).exec(function(err, createdUser) {
    //                    if (err) {
    //                        return next(err);
    //                    }
    //                    return next();
    //                }); //</User.create()>
    //            }
    //        }); //</Passwords.encryptPassword>
    //    }); // </ User.find
    //}, function afterwards(err){
    //    if (err) {
    //        return cb(err);
    //    }
    //
    //    return cb();
    //});
    return cb();
};



