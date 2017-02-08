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

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    'GET /': 'PageController.showHomePage',
    'GET /account': 'PageController.showHomePage',

    'GET /admin': 'PageController.showHomePage',


    'GET /admin/users': 'PageController.showHomePage',
    'GET /admin/users/settings': 'PageController.showHomePage',
    'GET /admin/users/list': 'PageController.showHomePage',
    'GET /admin/users/user/:id': 'UserController.findOne',
    'GET /admin/users/show/:id': 'UserController.findOne',
    'GET /admin/users/edit': 'PageController.showHomePage',
    'GET /admin/users/edit/:id': 'UserController.findOne',
    'GET /admin/users/:id': 'UserController.findOne',
    'GET /admin/:id': 'UserController.findOne',

    'GET /admin/departments': 'PageController.showHomePage',
    'GET /admin/departments/:id': 'DepartmentController.findOne',
    'GET /admin/departments/edit/:id': 'DepartmentController.findOne',
    'GET /admin/department/:id': 'DepartmentController.findOne',
    'GET /admin/depart': 'PageController.showHomePage',
    'GET /admin/depart/:id': 'DepartmentController.addDepartment',

    'GET /admin/users/create': 'PageController.showHomePage',
    //home/admin/departments/edit
    'PUT /user/:id': 'UserController.update',
    'POST /user': 'UserController.signup',
    'PUT /department/:id': 'DepartmentController.update',

    'GET /signup': {view: 'public/signup', locals: {layout: 'signup'}},


    //'GET /admin/users/show': 'PageController.showHomePage',
    //'GET /admin/users/edit': 'PageController.showHomePage',


    'GET /contact': 'PageController.showHomePage',

    //'GET /find/:id': 'UserController.find',
    //'POST /user': {response: 'notFound'},


    'POST /signup': 'UserController.signup',
    'PUT /login': 'UserController.login',
    'GET /logout': 'UserController.logout',
    'DELETE /user/:id': 'UserController.destroy'

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

};
