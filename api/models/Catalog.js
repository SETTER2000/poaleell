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
      defaultsTo: 'Собака'
    },
    sections: {
      type: 'string',
      defaultsTo: 'Собаки'
    },
    action: {
      type: 'boolean',
      defaultsTo: true
    },
    nickname: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 15
    },
    name: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 30
    },
    kennel: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 15
    },

    deleted: {
      type: 'boolean'
    },


    birthday: {
      type: 'date',
      defaultsTo: null
    },
    
    location: {
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

    getFullName: function () {
      return this.kennel + ' ' + this.name ;
    }

  }
};

