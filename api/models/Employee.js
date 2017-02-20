/**
 * Employees.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    connection: 'localMysqlServer',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    tableName: 'employees',
    //autoPK:false,
    attributes: {
        //section: {
        //  type: 'string',
        //  defaultsTo: 'Юзер'
        //},
        //sections: {
        //  type: 'string',
        //  defaultsTo: 'Юзеры'
        //},

        fname: {
            type: 'string',
            required: true
        },
        lname: {
            type: 'string',
            required: true
        },
        pname: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string'
        },
        time_in_employees:{
            type:'date'
        },
        time_update_employees:{
            type:'date'
        },
        description: {
            type: 'string'
        },
        //post_id: {
        //  type: 'number'
        //},
        //time_in_employees: {
        //  type: 'createdAt'
        //},
        //time_update_employees: {
        //  type: 'updatedAt'
        //},
        active: {
            type: 'boolean', defaultsTo: false
        },
        attendances: {
            collection: "attendance",
            via: 'employees_id',
            through: "attendance_employees"
        }
    }
};

