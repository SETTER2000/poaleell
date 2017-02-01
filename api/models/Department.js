/**
 * Department.js
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
            defaultsTo:'Отдел'
        },
        sections:{
          type:'string',
            defaultsTo:'Отделы'
        },
        name: {
            type: 'string'
        },
        //name: {
        //    type: 'string', unique: true, require:true
        //},
        type:{
            type:'string'
        },
        location:{
            type:'string'
        },
        lastLoggedIn: {
            type: 'date', required: true, defaultsTo: new Date(0)
        },


        // Добавить ссылку на пользователя
       users:{
            collection:'user',
            via:'departments'
        }

    }
};

