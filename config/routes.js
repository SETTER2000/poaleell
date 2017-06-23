/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /*************************************************************
     * JSON API ENDPOINTS                                                    *
     *************************************************************/

    // 'PUT /login': 'UserController.loginLDAP',
    'PUT /login': 'UserController.login',
    'GET /logout': 'PageController.logout',
    'POST /logout': 'UserController.logout',
    // 'GET /mail/send': 'MailController.send',
    //'GET /ldap': 'UserController.ldapConnect',
    'GET /report/skd': 'SkdController.getReportSkd',


    'PUT /user/remove-profile': 'UserController.removeProfile',
    'PUT /user/restore-profile': 'UserController.restoreProfile',
    'PUT /user/restore-gravatar-URL': 'UserController.restoreGravatarURL',
    'PUT /user/update-profile': 'UserController.updateProfile',
    'PUT /user/change-password': 'UserController.changePasswordProfile',
    'PUT /user/generate-recovery-email': 'UserController.generateRecoveryEmail',
    'PUT /user/update-admin/:id': 'UserController.updateAdmin',
    'PUT /user/update-kadr/:id': 'UserController.updateKadr',
    //'PUT /user/update-leader/:id': 'UserController.updateLeader',
    'PUT /user/update-action/:id': 'UserController.updateAction',
    'PUT /user/update-deleted/:id': 'UserController.updateDeleted',
    'PUT /user/updateProfile/:id': 'UserController.updateProfile',





    /**
     * Тестовые роуты
     */
    'GET /createReportSkd': 'SkdController.createReport',
    'GET /tut': 'TutorialController.createTutorial',
    'GET /ed': 'TutorialController.editTutorial',
    'POST /getAggregate': 'SkdController.getAggregate', // агрегированные данные из xsls отчётов посещаемости
    'GET /getAggregate': 'SkdController.getAggregate', // агрегированные данные из xsls отчётов посещаемости
    'GET /getAggregate/count': 'SkdController.getAggregateCount', // кол-во объектов





    // !!!! НЕ УДАЛЯТЬ РОУТ!
    //'POST /user/signup': 'UserController.signup',

    /**
     * RESTful routes
     */


    'POST /users': 'UserController.createUser',
    'GET /users': 'UserController.findUsers',
    'PUT /users/changePassword': 'UserController.changePassword',
    'GET /users/:id': 'UserController.findUsers',
    'DELETE /users/:id': 'UserController.destroy',
    'PUT /users/:id': 'UserController.update',


    'GET /positions/:id': 'PositionController.findPositions',
    'GET /positions': 'PositionController.findPositions',
    'PUT /positions/:id': 'PositionController.update',
    'DELETE /positions/:id': 'PositionController.destroy',
    'POST /positions': 'PositionController.createPosition',

    'POST /departments': 'DepartmentController.createDepartment',
    'GET /departments': 'DepartmentController.findDepartments',
    'PUT /departments/:id': 'DepartmentController.update',
    'GET /departments/:id': 'DepartmentController.findDepartments',
    'DELETE /departments/:id': 'DepartmentController.destroy',


    'GET /calendars/:id': 'CalendarController.findCalendars',
    'GET /calendars': 'CalendarController.findCalendars',
    'PUT /calendars/:id': 'CalendarController.update',


    'GET /skds': 'SkdController.getAggregate', //получить все записи skd
    //'GET /test': 'SkdController.test', //получить все записи skd
    'POST /skds': 'SkdController.getAggregate', //получить все записи skd
    'GET /skds/:id': 'SkdController.getAggregate', //получить все записи skd

    //'GET /skds/:id': 'SkdController.findOneRow', // получить одну строку по ID
    //'POST /skds': 'SkdController.createRow',
    //'PUT /users/changePassword': 'UserController.changePassword',
    //'GET /users/:id': 'UserController.findUsers',
    //'DELETE /users/:id': 'UserController.destroy',
    //'PUT /users/:id': 'UserController.update',

    'GET /attendance': 'Attendance.timeAll', // для календаря



    /*************************************************************
     * Server-rendered HTML Pages                                *
     *************************************************************/

    'GET /': 'PageController.showHomePage',
    'GET /profile': 'PageController.showHomePage',
    'GET /administration': 'PageController.showAdminPage',
    'GET /signup': 'PageController.showSignupPage',
    'GET /profile/edit': 'PageController.showHomePage',
    'GET /profile/restore': 'PageController.restoreProfile',


    'GET /password-recovery-email': 'PageController.passwordRecoveryEmail',
    'GET /password-recovery-email-sent': 'PageController.passwordRecoveryEmailSent',
    'GET /password-reset-form/:passwordRecoveryToken': 'PageController.passwordReset',


    'GET /admin': 'PageController.showHomePage',
    'GET /admin/users': 'PageController.getListUserPage',
    'GET /admin/users/administration': 'PageController.showAdminPage',
    'GET /admin/users/create': 'PageController.showHomePage',
    'GET /admin/users/exit': 'PageController.getExitUserPage',

    'GET /admin/departments': 'PageController.showHomePage',

    'GET /admin/attendances': 'PageController.showHomePage',
    'GET /admin/positions': 'PageController.showHomePage',
    'GET /admin/employees': 'PageController.showHomePage',


    //'GET /admin/users/attendance': 'PageController.showHomePage',
    'GET /admin/positions/create': 'PageController.showHomePage',
    //'GET /admin/users/list': 'PageController.showHomePage',
    'GET /admin/user/:id': 'PageController.showHomePage',
    'GET /admin/users/show/:id': 'UserController.findOne',
    //'GET /admin/users/edit': 'PageController.getEditUserPage',
    'PUT /admin/users/edit/changePassword': 'UserController.changePasswordProfile',
    'GET /admin/users/edit/:id': 'PageController.getEditUserPage',

    'GET /admin/departments/create': 'PageController.showHomePage',
    'GET /admin/departments/:id': 'DepartmentController.findOne',
    'GET /admin/departments/edit/:id': 'PageController.showHomePage',
    'GET /admin/department/:id': 'PageController.showHomePage',
    'GET /admin/depart': 'PageController.showHomePage',
    'GET /admin/depart/:id': 'DepartmentController.addDepartment',

    'GET /admin/positions/:id': 'PositionController.findOne',
    'GET /admin/positions/edit/:id': 'PageController.showHomePage',
    'GET /admin/position/:id': 'PositionController.findOne',

    'GET /admin/calendars': 'PageController.showHomePage',
    'GET /admin/calendars/:id': 'CalendarController.findOne',
    'GET /admin/calendars/create': 'PageController.showHomePage',
    'GET /admin/calendars/edit/:id': 'CalendarController.findOne',
    'GET /admin/calendar/:id': 'CalendarController.findOne',
    'GET /admin/calendar/:id/:month': 'PageController.showHomePage',
    'GET /admin/calendar/:id/:week': 'PageController.showHomePage',

    'GET /admin/employees/:id': 'PageController.showHomePage',
    'GET /admin/employees/edit/:id': 'PageController.showHomePage',
    'GET /admin/employee/:id': 'PageController.showHomePage',

    'GET /admin/skds': 'PageController.showHomePage',

    //'GET /admin/attendances/calendar': 'PageController.showHomePage',
    //'GET /admin/attendances/calendar/:id': 'PageController.showHomePage',

    'GET /user/adminUsers': 'UserController.adminUsers',

    // !!! НЕ УДАЛЯТЬ !!!
    //'GET /att': 'Attendance.getQuery',
    //'POST /att': 'Attendance.getQuery',
    //'GET /period': 'Attendance.findPeriod',
    //'GET /pd': 'Attendance.fPeriod',


    'GET /:login': {
        controller: 'PageController',
        action: 'profile',
        skipAssets: true
    }
};
