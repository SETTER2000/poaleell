/**
 * Attendance_employees.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    connection: 'localMysqlServer',
    autoCreatedAt: false,
    autoUpdateAt: false,
    tableName:'attendance_employees',
    autoPK: false,
    attributes: {
        attendance_id: {
            model:"attendance"
        },
        employees_id: {
            model:"employee"
        }
    }
};

