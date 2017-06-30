/**
 * Structure.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'userMongodbServer',
    attributes: {
      section: {
        type: 'string',
        defaultsTo: 'Структура'
      },
      sections: {
        type: 'string',
        defaultsTo: 'Структуры'
      },
      name: {
        type: 'string'
      }
    }

};

