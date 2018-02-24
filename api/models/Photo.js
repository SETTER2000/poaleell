/**
 * Photo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    //connection: 'userMongodbServer',
    attributes: {
        section: {
            type: 'string',
            defaultsTo: 'Фото',
            required: true
        },
        sections: {
            type: 'string',
            defaultsTo: 'Фотографии',
            required: true
        },
        action: {
            type: 'boolean',
            defaultsTo: true,
            required: true
        },
        name: {
            type: 'string',
            maxLength: 170
        },
        hash: {
            type: 'string',
            maxLength: 122
        },
        description: {
            type: 'string',
            maxLength: 170
        },
        descriptionEn: {
            type: 'string',
            maxLength: 170
        },
        lastLoggedIn: {
            type: 'date',
            required: true,
            defaultsTo: new Date(0)
        },
        photoUrl: {
            type: 'string'
        },
        photoFd: {
            type: 'string'
        },
        fileNamePhoto: {
            type: 'string'
        },
        titles: {
            model: 'title'
        },
        catalogs: {
            model: 'catalog'
        },
        reactions: {
            model: 'reaction'
        },
        pedigrees: {
            model: 'pedigree'
        }
        // titles: {
        //   model: 'title'
        // },

        // vacations: {
        //   collection: 'vacation',
        //   via: 'furloughs'
        // }
        // Добавить ссылку на пользователя
        //users: {
        //    collection: 'user',
        //    via: 'furloughs'
        //}

    }
};

