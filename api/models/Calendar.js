/**
 * Calendar.js
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
            defaultsTo: 'Календарь'
        },
        sections: {
            type: 'string',
            defaultsTo: 'Календари'
        },
        action: {
            type: 'boolean',
            defaultsTo: true,
            required: true

        },
        name: {
            type: 'string',
            unique: true
        },
        type: {
            type: 'string',
            defaultsTo: ''
        },
        year: {
            type: 'date',
            required: true,
            defaultsTo: new Date(0)
        },
        location: {
            type: 'string',
            defaultsTo: ''
        }
    }
};

