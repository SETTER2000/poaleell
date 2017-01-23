/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'userMongodbServer', schema: true, attributes: {
        first_name: {
            type: 'string', required: true
        },

        last_name: {
            type: 'string', required: true
        },

        patronymic_name: {
            type: 'string', required: true
        },

        login: {
            type: 'string', required: true, unique: true
        },

        email: {
            type: 'string', email: true, required: true, unique: true
        },

        birthday: {
            type: 'date', required: true
        },

        subdivision: {
            type: 'string',  defaultsTo: 'нет данных'
        },

        encryptedPassword: {
            type: 'string', required: true
        },

        lastLoggedIn: {
            type: 'date', required: true, defaultsTo: new Date(0)
        },

        gravatarUrl: {
            type: 'string'
        }
    }
};

