/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'userMongodbServer',
    schema: true,
    attributes: {
        section:{
            type:'string',
            defaultsTo:'Сотрудник'
        },
        sections:{
            type:'string',
            defaultsTo:'Сотрудники'
        },
        firstName: {
            type: 'string', required: true
        },

        lastName: {
            type: 'string', required: true
        },

        patronymicName: {
            type: 'string', required: true
        },

        login: {
            type: 'string', required: true, unique: true
        },

        email: {
            type: 'string', email: true, required: true
        },

        birthday: {
            type: 'date'
        },

        subdivision: {
            type: 'string', defaultsTo: 'нет данных'
        },
        position: {
            type: 'string', defaultsTo: 'нет данных',
            size: 50
        },
        encryptedPassword: {
            type: 'string', required: true
        },
        contacts: {
            type: 'array',
            defaultsTo:[{"type":"","value":""}]
        },
        fired: {
            type: 'boolean', defaultsTo: false
        },
        firedDate: {
            type: 'date'
        },
        dateInWork: {
            type: 'date'
        },
        pfr: {
            type: 'string',
            size: 15
        },
        lastLoggedIn: {
            type: 'date', required: true, defaultsTo: new Date(0)
        },

        gravatarUrl: {
            type: 'string'
        },

        departments:{
            collection:'department',
            via:'users',
            dominant:true
        }
    }
};

