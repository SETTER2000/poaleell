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
            type: 'string'
        },
        endPeriod: {
            type: 'string'
        },
        headerOneRow: {
            type: 'string'
        },
        headerTwoRow: {
            type: 'string'
        },
        date: {
            type: 'string'
        },
        owner:{
            collection:'user',
            via: 'attendances'

        }
    }
};

