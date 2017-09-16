/**
 * Diary.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'userMongodbServer',
    //schema: true,
    attributes: {
        section: {
            type: 'string',
            defaultsTo: 'Дневник'
        },
        sections: {
            type: 'string',
            defaultsTo: 'Дневники'
        },

        name: {
            type: 'string',
            maxLength: 120,
            required:true
        },

        nameSubEvent: {
            type: 'string',
            maxLength: 120
        },

        dateEvent: {
            type: 'datetime',
            defaultsTo: new Date()
        },
        themeEvent: {
            type: 'string',
            maxLength: 120
        },
        description: {
            type: 'string'
        },
        catalogs:{
            model:'catalog'
        }

    }
};

