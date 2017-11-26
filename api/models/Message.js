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
            defaultsTo: 'Сообщение'
        },
        sections: {
            type: 'string',
            defaultsTo: 'Сообщения'
        },
        action: {
            type: 'boolean',
            defaultsTo: true
        },
        message: {
            type: 'string',
            // required: true,
            maxLength: 250,
            minLength: 3
        },
        feedback: {
            type: 'email',
            // required: true,
            maxLength: 35
        },
        senderUsers: { // отправитель
            collection: 'user',
            via: 'senders'
        },
        recipientUsers: { // получатель
            collection: 'user',
            via: 'recipients'
        },
        dog: { // получатель
            model: 'catalog'
        },


        //
        // inlinePanel: {
        //     type: 'boolean'
        // },
        // weight: {
        //     type: 'integer',
        //     // required: true
        // },
        //
        // growth: {
        //     type: 'integer',
        //     // required: true
        // },
        //
        // variety: {
        //     type: 'string',
        //     // required: true,
        //     // minLength: 3,
        //     // maxLength: 15
        // },
        // color: {
        //     type: 'string',
        //     // required: true,
        //     // minLength: 4,
        //     // maxLength: 15
        // },
        //
        // deleted: {
        //     type: 'boolean'
        // },
        //
        // sales: {
        //     type: 'boolean'
        // },
        //
        // salesDescription: {
        //     type: 'string',
        //     maxLength: 250
        // },
        // price: {
        //     type: 'array',
        //     defaultsTo: '[]'
        // },
        // messages: {
        //     type: 'array',
        //     defaultsTo: '[]'
        // },
        //
        // birthday: {
        //     type: 'date',
        //     // required: true
        // },
        // dateWeight: {
        //     type: 'date',
        //     // required: true
        // },
        // timebirt: {
        //     type: 'string',
        //     // required: true
        // },
        //
        // alias: {
        //     type: 'string'
        // },
        // location: {
        //     type: 'string'
        // },
        //
        // // lastLoggedIn: {
        // //     type: 'date',
        // //     // required: true,
        // //     defaultsTo: new Date(0)
        // // },
        // death: {
        //     type: 'date',
        //     defaultsTo: null
        // },
        // gravatarUrl: {
        //     type: 'string'
        // },
        // avatarUrl: {
        //     type: 'string'
        // },
        // description: {
        //     type: 'string',
        //     maxLength: 500
        // },
        // pedigree: {
        //     type: 'string'
        //     // maxLength: 15
        // },
        // rkf: {
        //     type: 'string',
        //     maxLength: 25
        // },
        // pll: {
        //     type: 'string',
        //     maxLength: 15
        // },
        // pra: {
        //     type: 'string',
        //     maxLength: 25
        // },
        // dm: {
        //     type: 'string',
        //     maxLength: 25
        // },
        // stamp: {
        //     type: 'string',
        //     maxLength: 25
        // },
        // chip: {
        //     type: 'string',
        //     maxLength: 25
        // },
        // symbol: {
        //     type: 'string'
        // },
        // titles: {
        //     collection: 'title',
        //     via: 'catalogs'
        // },
        // kennels: {
        //     collection: 'department',
        //     via: 'catalogs',
        //     required: true
        // },
        //
        // breeders: {
        //     collection: 'user',
        //     via: 'breederCatalogs'
        // },
        //
        // owners: {
        //     collection: 'user',
        //     via: 'catalogs'
        // },
        //
        // sires: {
        //     model: 'catalog'
        // },
        //
        // dams: {
        //     model: 'catalog'
        // },
        // diarys: {
        //     model: 'diary'
        // },
        // photos: {
        //     collection: 'photo',
        //     via: 'catalogs'
        // },
        // reactions: {
        //     collection: 'reaction',
        //     via: 'catalogs'
        // },
        // getFullName: function () {
        //     return 'XXXX-NAME';
        //     // return this.kennels[0].name + this.name ;
        // }

    }
};



