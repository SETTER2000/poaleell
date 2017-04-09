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

    'PUT /login': 'UserController.login',
    'POST /logout': 'UserController.logout',
    'GET /logout': 'PageController.logout',
    

    'POST /user/signup': 'UserController.signup',
    'PUT /user/remove-profile': 'UserController.removeProfile',
    'PUT /user/restore-profile': 'UserController.restoreProfile',
    'PUT /user/restore-gravatar-URL': 'UserController.restoreGravatarURL',
    'PUT /user/update-profile': 'UserController.updateProfile',
    'PUT /user/change-password': 'UserController.changePassword',
    
    'GET /users/:id': 'UserController.findUsers',
    'GET /users': 'UserController.findUsers',
    'DELETE /users/:id': 'UserController.destroy',
    
    'GET /positions/:id': 'PositionController.findPositions',
    'GET /positions': 'PositionController.findPositions',
    
    'GET /departments/:id': 'DepartmentController.findDepartments',
    'GET /departments': 'DepartmentController.findDepartments',
   
    /*************************************************************
     * Server-rendered HTML Pages                                *
     *************************************************************/

    'GET /': 'PageController.showHomePage',
    'GET /profile/edit': 'PageController.showHomePage',
    'GET /profile': 'PageController.showHomePage',
    'GET /profile/restore': 'PageController.restoreProfile',
    'GET /administration': 'PageController.showAdminPage',
    'GET /signup': 'PageController.showSignupPage',




    'GET /admin': 'PageController.showHomePage',
    'GET /admin/users/administration': 'PageController.showAdminPage',
   


    'GET /admin/users': 'PageController.showHomePage',
    'GET /admin/departments': 'PageController.showHomePage',

    'GET /admin/attendances': 'PageController.showHomePage',
    'GET /admin/positions': 'PageController.showHomePage',
    'GET /admin/employees': 'PageController.showHomePage',


    'GET /admin/users/create': 'PageController.showHomePage',
    'GET /admin/users/settings': 'PageController.showHomePage',
    'GET /admin/users/attendance': 'PageController.showHomePage',
    'GET /admin/positions/settings': 'PageController.showHomePage',
    'GET /admin/positions/create': 'PageController.showHomePage',
    'GET /admin/departments/create': 'PageController.showHomePage',
    'GET /admin/users/list': 'PageController.showHomePage',
    'GET /admin/user/:id': 'PageController.showHomePage',
    'GET /admin/users/show/:id': 'UserController.findOne',
    'GET /admin/users/edit': 'PageController.showHomePage',
    'PUT /admin/users/edit/changePassword': 'UserController.changePassword',
    'GET /admin/users/edit/:id': 'PageController.showHomePage',
    'GET /admin/users/:id': 'UserController.findOne',
    'GET /admin/departments/:id': 'DepartmentController.findOne',
    'GET /admin/departments/edit/:id': 'DepartmentController.findOne',
    'GET /admin/department/:id': 'PageController.showHomePage',
    'GET /admin/depart': 'PageController.showHomePage',
    'GET /admin/depart/:id': 'DepartmentController.addDepartment',
    'GET /admin/positions/:id': 'PositionController.findOne',
    'GET /admin/positions/edit/:id': 'PositionController.findOne',
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


    'GET /admin/attendances/calendar': 'PageController.showHomePage',
    'GET /admin/attendances/calendar/:id': 'PageController.showHomePage',



    'PUT /user/:id': 'UserController.update',
    'POST /user': 'UserController.signup',


    'PUT /department/:id': 'DepartmentController.update',
    'PUT /calendar/:id': 'CalendarController.update',
    'PUT /position/:id': 'PositionController.update',



    'GET /user/adminUsers': 'UserController.adminUsers',
    'PUT /user/updateProfile/:id': 'UserController.updateProfile',
    'PUT /user/changePassword': 'UserController.changePassword',

  
    'GET /att': 'Attendance.getQuery',
    'POST /att': 'Attendance.getQuery',
    'GET /period': 'Attendance.findPeriod',
    'GET /pd': 'Attendance.fPeriod',
    'GET /api': 'Attendance.timeAll',

   
    'DELETE /position/:id': 'PositionController.destroy'

};
