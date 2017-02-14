/**
 * Attendance.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    connection: 'localMysqlServer',
    autoCreatedAt: false,
    autoUpdateAt: false,
    tableName:'attendance',
    //autoPK:false,
    attributes: {
        date: {
            type:'date'
        },
        //time_in: {
        //    type:'date'
        //},
        //time_out: {
        //    type:'date'
        //},
        //report_xls_id: {
        //    type:'integer'
        //},
        employees:{
           collection:'employee',
            via:'attendance_id',
            through:'attendance_employees'
        }
    }
};

