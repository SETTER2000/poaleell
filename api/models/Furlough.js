/**
 * Holiday.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'userMongodbServer',
    attributes: {
        attributes: {
            section: {
                type: 'string',
                defaultsTo: 'Отпуск'
            },
            sections: {
                type: 'string',
                defaultsTo: 'Отпуска'
            },
            action: {
                type: 'boolean',
                defaultsTo: true,
                required: true
            },
            name: {
                type: 'string',
                unique: true,
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
            lastLoggedIn: {
                type: 'date',
                required: true,
                defaultsTo: new Date(0)
            },
            children: {
                type: 'array'
            },
            parent: {
                type: 'string'
            },
            childrenObj: {
                type: 'array'
            },
            ancestors: {
                type: 'array'
            }
            // Добавить ссылку на пользователя
            //users: {
            //    collection: 'user',
            //    via: 'holidays'
            //}
        }
    }
};

