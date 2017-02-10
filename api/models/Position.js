/**
 * Position.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'userMongodbServer',
    schema: true,
    attributes: {
        section: {
            type: 'string',
            defaultsTo: 'Должность'
        },
        sections: {
            type: 'string',
            defaultsTo: 'Должности'
        },
        action: {
            type: 'boolean',
            defaultsTo: true,
            required: true
        },
        name: {
            type: 'string',
            unique:true
        },
        // Добавить ссылку на пользователя
        users: {
            collection: 'user',
            via: 'positions'
        }
    }
};

