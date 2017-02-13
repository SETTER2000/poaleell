/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'localMysqlServer',
    autoCreatedAt: false,
    autoUpdateAt: false,
    attributes: {
        fname: {
            type: 'string'
        },
        lname: {
            type: 'string'
        },
        pname: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        post_id: {
            type: 'number'
        },
        time_in_employees: {
            type: 'date', required: true, defaultsTo: new Date(0)
        },
        time_update_employees: {
            type: 'date'
        },
        active: {
            type: 'boolean', defaultsTo: false
        }

    }
};

