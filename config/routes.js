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
'use strict';
module.exports.routes = {

    /*************************************************************
     *                 JSON API ENDPOINTS                        *
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
    'PUT /user/update-action/:id': 'UserController.updateAction',
    'PUT /user/update-deleted/:id': 'UserController.updateDeleted',
    'PUT /user/updateProfile/:id': 'UserController.updateProfile',
    'POST /file/upload': 'UserController.upload',
   
    'POST /file/uploadDogs': 'CatalogController.upload',
    'POST /file/uploadTitles': 'PhotoController.uploadTitlePhoto',
    'POST /file/uploadReactions': 'PhotoController.uploadReactionPhoto',

    'GET /user/getUsersDepartment/:id': 'UserController.getUsersDepartment',
    'POST /users/ldap': 'UserController.searchLDAP',

    /**
     * Тестовые роуты
     */



    /**
     * Skds
     */
    'GET /getListYear': 'SkdController.getListYear',

    // 'GET /getListMonth': 'SkdController.getListMonth',


    /**
     * Department
     */
    'Get /getRootDepartment': 'DepartmentController.getRootDepartment',


    /**
     * Structure
     */
    'GET /getStructure': 'StructureController.get',
    'GET /getStructure/:id': 'StructureController.get',

    /**
     * Honor
     */
    'POST /honor/upload': 'HonorController.upload',
    'GET /honor/full': 'HonorController.download',
    'GET /honor/date': 'HonorController.date',


    // !!!! НЕ УДАЛЯТЬ РОУТ!
    'POST /user/signup': 'UserController.signup',


    /***************************************
     *         RESTful routes              *
     ***************************************/

    /**
     * User
     */
    'POST /users': 'UserController.createUser',
    'GET /users': 'UserController.findUsers',
    'PUT /users/changePassword': 'UserController.changePassword',

    'GET /users/:id': 'UserController.findUsers',
    'DELETE /users/:id': 'UserController.destroy',
    'PUT /users/:id': 'UserController.update',


    /**
     * Position
     */
    'GET /positions/:id': 'PositionController.findPositions',
    'GET /positions': 'PositionController.findPositions',
    'PUT /positions/:id': 'PositionController.update',
    'DELETE /positions/:id': 'PositionController.destroy',
    'POST /positions': 'PositionController.createPosition',


    /**
     * Department
     */
    'POST /departments': 'DepartmentController.createDepartment',
    'GET /departments': 'DepartmentController.findDepartments',
    'PUT /departments/:id': 'DepartmentController.update',
    'GET /departments/:id': 'DepartmentController.findDepartments',
    'DELETE /departments/:id': 'DepartmentController.destroy',


    /**
     * Calendar
     */
    'GET /calendars/:id': 'CalendarController.findCalendars',
    'GET /calendars': 'CalendarController.findCalendars',
    'PUT /calendars/:id': 'CalendarController.update',


    /**
     * Skds
     */
    'GET /skds': 'SkdController.get', //получить все записи skd
    'POST /skds': 'SkdController.get', //получить все записи skd
    'GET /skds/:id': 'SkdController.get', //получить все записи skd

    

    /**
     * Structure
     */
    'GET /structures': 'StructureController.get', //получить все записи
    // 'POST /structures': 'StructureController.post', //получить все записи
    'GET /structures/:id': 'StructureController.get', //получить все записи


    /**
     * Attendance
     */
    'GET /attendance': 'Attendance.timeAll', // для календаря


    /**
     * Furlough
     */
    'GET /furloughs': 'FurloughController.get', //получить все записи или одну по http://localhost:1338/furloughs?id=599c4aefc97f011f70a2359b
    'POST /furloughs': 'FurloughController.create', // создать запись
    'DELETE /furloughs/:id': 'FurloughController.destroy', // удалить
    'PUT /furloughs/:id': 'FurloughController.update', // обновить

    /**
     * Vacation
     */
    'GET /vacations': 'VacationController.get', // получить все записи или одну по http://localhost:1338/furloughs?id=599c4aefc97f011f70a2359b
    'POST /vacations': 'VacationController.create', // создать запись
    'DELETE /vacations/:id': 'VacationController.destroy', // удалить
    'PUT /vacations/:id': 'VacationController.update', // обновить

    /**
     * Catalogs
     */
    'GET /catalogs': 'CatalogController.get', // получить все записи или одну по http://localhost:1338/catalogs?id=599c4aefc97f011f70a2359b
    'POST /catalogs': 'CatalogController.create', // создать запись
    'DELETE /catalogs/:id': 'CatalogController.destroy', // удалить
    'POST /catalogs/:id': 'CatalogController.update', // удалить
    'PUT /catalogs/:id': 'CatalogController.update', // обновить


    /**
     * Titles
     */
    'GET /titles': 'TitleController.get', //получить все записи или одну по http://localhost:1338/furloughs?id=599c4aefc97f011f70a2359b
    'POST /titles': 'TitleController.create', // создать запись
    'DELETE /titles/:id': 'TitleController.destroy', // удалить
    'PUT /titles/:id': 'TitleController.update', // обновить
    
    
    
    /**
     * Reactions
     */
    'GET /reactions': 'ReactionController.get', //получить все записи или одну по http://localhost:1338/furloughs?id=599c4aefc97f011f70a2359b
    'POST /reactions': 'ReactionController.create', // создать запись
    'DELETE /reactions/:id': 'ReactionController.destroy', // удалить
    'PUT /reactions/:id': 'ReactionController.update', // обновить
    


    /**
     * Diarys
     */
    'GET /diarys': 'DiaryController.get', //получить все записи или одну по http://localhost:1338/furloughs?id=599c4aefc97f011f70a2359b
    'POST /diarys': 'DiaryController.create', // создать запись
    'DELETE /diarys/:id': 'DiaryController.destroy', // удалить
    'PUT /diarys/:id': 'DiaryController.update', // обновить


    

    /**
     * Photos
     */
    'GET /photos': 'PhotoController.get', //получить все записи или одну по http://localhost:1338/furloughs?id=599c4aefc97f011f70a2359b
    // 'POST /photos': 'PhotoController.create', // создать запись
    // 'DELETE /photos/:id': 'PhotoController.destroy', // удалить
    // 'PUT /photos/:id': 'PhotoController.update', // обновить
    
    
    
    
    
    /*************************************************************
     * Server-rendered HTML Pages                                *
     *************************************************************/

    'GET /': 'PageController.showHomePage',
    'GET /profile': 'PageController.showHomePage',
    'GET /about': 'PageController.showHomePage',
    'GET /administration': 'PageController.showAdminPage',
    'GET /signup': 'PageController.showSignupPage',
    'GET /profile/edit': 'PageController.showHomePage',
    'GET /profile/restore': 'PageController.restoreProfile',


    'GET /password-recovery-email': 'PageController.passwordRecoveryEmail',
    'GET /password-recovery-email-sent': 'PageController.passwordRecoveryEmailSent',
    'GET /password-reset-form/:passwordRecoveryToken': 'PageController.passwordReset',


    'GET /admin': 'PageController.showHomePage',
    'GET /admin/users': 'PageController.showHomePage',
    'GET /admin/users/administration': 'PageController.showHomePage',
    'GET /admin/users/create': 'PageController.showHomePage',
    'GET /admin/users/exit': 'PageController.getExitUserPage',

    'GET /admin/departments': 'PageController.showHomePage',

    'GET /admin/attendances': 'PageController.showHomePage',
    'GET /admin/positions': 'PageController.showHomePage',
    'GET /admin/employees': 'PageController.showHomePage',
    'GET /admin/furloughs': 'PageController.showHomePage',
    'GET /admin/vacations': 'PageController.showHomePage',


   
    'GET /admin/positions/create': 'PageController.showHomePage',
    'GET /admin/user/:id': 'PageController.showHomePage',
    'GET /admin/users/show/:id': 'UserController.findOne',
    'PUT /admin/users/edit/changePassword': 'UserController.changePasswordProfile',
    'GET /admin/users/edit/:id': 'PageController.showHomePage',
 

    'GET /admin/departments/create': 'PageController.showHomePage',
    'GET /admin/departments/:id': 'DepartmentController.findOne',
    'GET /admin/departments/edit/:id': 'PageController.showHomePage',
    'GET /admin/department/:id': 'PageController.showHomePage',
    'GET /admin/depart': 'PageController.showHomePage',
    'GET /admin/depart/:id': 'DepartmentController.addDepartment',

    'GET /admin/positions/:id': 'PositionController.findOne',
    'GET /admin/positions/edit/:id': 'PageController.showHomePage',
    'GET /admin/position/:id': 'PageController.showHomePage',

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
    'GET /admin/structures': 'PageController.showHomePage',

    'GET /admin/furloughs/edit/:id': 'PageController.showHomePage',
    'GET /admin/furloughs/create/': 'PageController.showHomePage',

    'GET /admin/vacations/edit/:id': 'PageController.showHomePage',
    'GET /admin/vacations/create': 'PageController.showHomePage',


    // 'GET /admin/catalog/:id/diary/:id': 'PageController.showHomePage',
    // 'GET /admin/catalog/:id/diary/': 'PageController.showHomePage',
    'GET /admin/catalogs': 'PageController.showHomePage',
    'GET /admin/catalog/:id': 'PageController.showHomePage',
    'GET /admin/catalogs/create': 'PageController.showHomePage',
    'GET /admin/catalogs/edit/:id': 'PageController.showHomePage',


    'GET /admin/titles': 'PageController.showHomePage',
    'GET /admin/titles/edit/:id': 'PageController.showHomePage',
    'GET /admin/titles/create/': 'PageController.showHomePage',
    'GET /admin/title/:id': 'PageController.showHomePage',



    'GET /admin/reactions': 'PageController.showHomePage',
    'GET /admin/reactions/edit/:id': 'PageController.showHomePage',
    'GET /admin/reactions/create/': 'PageController.showHomePage',
    'GET /admin/reactions/:id': 'PageController.showHomePage',


    'GET /admin/photos': 'PageController.showHomePage',
    'GET /admin/photos/edit/:id': 'PageController.showHomePage',
    'GET /admin/photos/create/': 'PageController.showHomePage',
    'GET /admin/photos/:id': 'PageController.showHomePage',

    'GET /admin/diarys/catalog/:id': 'PageController.showHomePage',
    'GET /admin/diarys/catalog/': 'PageController.showHomePage',
    'GET /admin/diarys': 'PageController.showHomePage',
    'GET /admin/diarys/edit/:id': 'PageController.showHomePage',
    'GET /admin/diarys/create/': 'PageController.showHomePage',
    'GET /admin/diarys/:id': 'PageController.showHomePage',



    'GET /upload': 'PageController.showHomePage',
    'GET /admin/honors': 'PageController.showHomePage',
    'GET /file/upload': 'PageController.showHomePage',

    //'GET /admin/attendances/calendar': 'PageController.showHomePage',
    //'GET /admin/attendances/calendar/:id': 'PageController.showHomePage',

    'GET /user/adminUsers': 'UserController.adminUsers',


    'GET /dashboard/showcases': 'PageController.showHomePage',
    
    
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
