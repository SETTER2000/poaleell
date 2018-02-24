/**
 * Reaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'userMongodbServer',
    attributes: {
        section: {
            type: 'string',
            defaultsTo: 'Тест',
            required: true
        },
        sections: {
            type: 'string',
            defaultsTo: 'Тесты',
            required: true
        },
        action: {
            type: 'boolean',
            defaultsTo: false
        },
        sales: {
            type: 'boolean',
            defaultsTo: true,
            required: true
        },
        name: {
            type: 'string',
            //unique: true,
            minLength: 2,
            maxLength: 150
        },
        tip: {
            type: 'string',
            defaultsTo: ''
        },
        location: {
            type: 'string',
            defaultsTo: ''
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

        catalogs: {
            collection: 'catalog',
            via: 'reactions'
        },
        photos: {
            collection: 'photo',
            via: 'reactions'
        }
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

