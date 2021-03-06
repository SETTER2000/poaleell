/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    //connection: 'userMongodbServer',
    schema: true,
    attributes: {
        section: {
            type: 'string',
            defaultsTo: 'Пользователь'
        },
        sections: {
            type: 'string',
            defaultsTo: 'Пользователи'
        },
        action: {
            type: 'boolean',
            defaultsTo: true
        },
        firstName: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 15
        },

        lastName: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 15
        },
        patronymicName: {
            type: 'string',
            minLength: 2,
            maxLength: 15
        },
        onLine: {
            type: 'boolean',
            defaultsTo: false
        },
        login: {
            type: 'string',
            required: true,
            unique: true
        },

        email: {
            type: 'string',
            email: true,
            unique: true,
            required: true
        },

        deleted: {
            type: 'boolean'
        },

        admin: {
            type: 'boolean'
        },

        kadr: {
            type: 'boolean'
        },

        leader: {
            type: 'boolean'
        },

        birthday: {
            type: 'date',
            defaultsTo: null
        },

        subdivision: {
            type: 'array',
            defaultsTo: '[]'
        },
        position: {
            type: 'array',
            defaultsTo: '[]'
        },

        furlough: {
            type: 'array',
            defaultsTo: '[]'
        },
        encryptedPassword: {
            type: 'string',
            required: true
        },

        contacts: {
            type: 'array',
            defaultsTo: [{"type": "", "value": ""}]
        },

        fired: {
            type: 'boolean',
            defaultsTo: false
        },

        firedDate: {
            type: 'date',
            defaultsTo: null
        },

        dateInWork: {
            type: 'date',
            defaultsTo: null
        },
        //dateFurlough: {
        //    type: 'date',
        //    defaultsTo: null
        //},
        decree: {
            type: 'date',
            defaultsTo: null
        },
        room: {
            type: 'string'
        },

        location: {
            type: 'string'
        },

        pfr: {
            type: 'string',
            size: 15
        },

        workplace: {
            type: 'string'
        },

        lastLoggedIn: {
            type: 'date',
            required: true,
            defaultsTo: new Date(0)
        },

        gravatarUrl: {
            type: 'string'
        },

        avatarUrl: {
            type: 'string'
        },

        departments: {
            collection: 'department',
            via: 'users',
            dominant: true
        },

        positions: {
            collection: 'position',
            via: 'users',
            dominant: true
        },

        recipients: {
            collection: 'message',
            via: 'recipientUsers',
            dominant: true
            // required: true
        },

        senders: {
            collection: 'message',
            via: 'senderUsers',
            dominant: true
            // required: true
        },


        skds: {
            collection: 'skd',
            via: 'users',
            dominant: true
        },
        furloughs: {
            collection: 'furlough',
            via: 'users',
            dominant: true
        },
        city: {type: 'string'},
        country: {type: 'string'},
        address: {type: 'string'},
        vacations: {
            collection: 'vacation',
            via: 'users',
            dominant: true
        },
        catalogs: {
            collection: 'catalog',
            via: 'owners',
            dominant: true
        },
        breederCatalogs: {
            collection: 'catalog',
            via: 'breeders',
            dominant: true
        },
        defaultRows: {
            type: 'integer',
            defaultsTo: 10
        },
        //// Отпуска тестовый
        //fur: {
        //    type: 'array',
        //    defaultsTo: [{"type": "", "value": ""}]
        //},

        getFullName: function () {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymicName;
        }

    }
};

