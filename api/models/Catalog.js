/**
 * Catalog.js
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
            defaultsTo: 'Каталог'
        },
        sections: {
            type: 'string',
            defaultsTo: 'Каталоги'
        },
        action: {
            type: 'boolean',
            defaultsTo: true
        },
        nickname: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 20
        },
        name: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 40
        },
        kennel: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 40
        },
        gender: {
            type: 'string',
            required: true,
            minLength: 4,
            maxLength: 15
        },

        weight: {
            type: 'integer',
            required: true
        },

        growth: {
            type: 'integer',
            required: true
        },

        variety: {
            type: 'string',
            required: true,
            minLength: 3,
            maxLength: 15
        },
        color: {
            type: 'string',
            required: true,
            minLength: 4,
            maxLength: 15
        },
        breeder: {
            type: 'string',
            required: true,
            minLength: 4,
            maxLength: 15
        },

        owner: {
            type: 'string',
            required: true,
            minLength: 4,
            maxLength: 15
        },

        deleted: {
            type: 'boolean'
        },


        birthday: {
            type: 'date',
            required: true
        },

        location: {
            type: 'string'
        },

        lastLoggedIn: {
            type: 'date',
            required: true,
            defaultsTo: new Date(0)
        },
        death: {
            type: 'date',
            defaultsTo: null
        },
        gravatarUrl: {
            type: 'string'
        },
        avatarUrl: {
            type: 'string'
        },
        pedigree: {
            type: 'string',
            maxLength: 15
        },
        rkf: {
            type: 'string',
            maxLength: 15
        },
        pll: {
            type: 'string',
            maxLength: 15
        },
        pra: {
            type: 'string',
            maxLength: 15
        },
        dm: {
            type: 'string',
            maxLength: 15
        },
        stamp: {
            type: 'string',
            maxLength: 10
        }, 
        chip: {
            type: 'string',
            maxLength: 10
        },
        titles: {
            collection: 'title',
            via: 'catalogs'
        },
        getFullName: function () {
            return this.kennel + ' ' + this.name;
        }

    }
};


