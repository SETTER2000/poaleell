/**
 * Skd.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'userMongodbServer',
    attributes: {
        section: {
            type: 'string',
            defaultsTo: ''
        },
        sections: {
            type: 'string',
            defaultsTo: ''
        },
        name: {
            type: 'string'
        },
        dateCreate: {
            type: 'string'
        },
        startPeriod: {
            type: 'datetime'
        },
        endPeriod: {
            type: 'datetime'
        },
        headerOneRow: {
            type: 'string'
        },
        headerTwoRow: {
            type: 'string'
        },
        date: {
            type: 'datetime'
        },
        // Добавить ссылку на пользователя
        users: {
            collection: 'user',
            via: 'skds'
        },
        getLastName: function () {
            let fio = this.name.split(' ');
            return fio[0]
        }
    }
};

