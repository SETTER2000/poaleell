/**
 * Title.js
 * Титулы
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'userMongodbServer',
    attributes: {
      section: {
        type: 'string',
        defaultsTo: 'Титул',
        required: true
      },
      sections: {
        type: 'string',
        defaultsTo: 'Титулы',
        required: true
      },
      action: {
        type: 'boolean',
        defaultsTo: true,
        required: true
      },
      multiplicity:{
        type:'integer'
      },
        year:{
        type:'integer'
      },
      name: {
        type: 'string',
        //unique: true,
        minLength: 2,
        maxLength: 150
      },
      tip: {
        type: 'string',
        defaultsTo: ''
      },
      location: {
        type: 'string',
        defaultsTo: ''
      },
      description:{
        type:'string',
        maxLength:170
      },  
      descriptionEn:{
        type:'string',
        maxLength:170
      },
      lastLoggedIn: {
        type: 'date',
        required: true,
        defaultsTo: new Date(0)
      },
    
      catalogs: {
        collection: 'catalog',
        via: 'titles'
      },
      photos: {
        collection: 'photo',
        via: 'titles'
      }
      // vacations: {
      //   collection: 'vacation',
      //   via: 'furloughs'
      // }
      // Добавить ссылку на пользователя
      //users: {
      //    collection: 'user',
      //    via: 'furloughs'
      //}

    }
};

