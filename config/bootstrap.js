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
    Video.count().exec(function (err, numVideos) {
        if (err) {
            return cb(err);
        }

        if (numVideos > 0) {
            console.log('Количество видеозаписей: ', numVideos);
            return cb();
        }

        // TODO: Заполнить базу данных видеороликами с YouTube.
        var Youtube = require('machinepack-youtube');

        // Список видео Youtube, которые соответствуют указанному поисковому запросу..
        Youtube.searchVideos({
            query: 'chinese crested dogs puppies',
            apiKey: sails.config.google.apiKey,
            limit: 15
        }).exec({
            // Произошла непредвиденная ошибка.
            error: function (err) {
                console.log('An error:', err);
                return cb(err);
            },

            // OK.
            // Листинг 5.8. Маршалинг возвращаемых данных с машины .searchVideos ()
            success: function (foundVideos) {
                // Итерации по каждому видео с помощью _.each ()
                _.each(foundVideos, function (video) {
                    video.src = 'https://www.youtube.com/embed/' + video.id;
                    delete video.description;
                    delete video.publishedAt;
                    delete video.id;
                    delete video.url;
                });

                Video.create(foundVideos).exec(function (err, videoRecordsCreated) {
                    if (err) {
                        return cb(err);
                    }
                    console.log(videoRecordsCreated);
                    return cb();
                });
            }
        });

        //console.log('Нет видеозаписей.');

    });
};
