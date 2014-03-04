/**
 * AdminController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/admin/index`
   *    `/admin`
   */
   index: function (req, res) {
    
    // Send a JSON response
    return res.view({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/admin/accounts`
   */
   accounts: function (req, res) {
    
    // Send a JSON response
    return res.view({
        data: {
            results: ['world']
            , statuses: []
        }
    });
  },


  /**
   * Action blueprints:
   *    `/admin/admin-groups`
   */
   admin_groups: function (req, res) {
    
    // Send a JSON response
    return res.view({
        data: {results: ['world']}
    });
  },


  /**
   * Action blueprints:
   *    `/admin/administrators`
   */
   administrators: function (req, res) {
    
    // Send a JSON response
    return res.view({
        data: {results: ['world']}
    });
  },


  /**
   * Action blueprints:
   *    `/admin/categories`
   */
   categories: function (req, res) {
    
    // Send a JSON response
    return res.view({
        data: {results: ['world']}
    });
  },


  /**
   * Action blueprints:
   *    `/admin/search`
   */
   search: function (req, res) {
    
    // Send a JSON response
    return res.view({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/admin/statuses`
   */
   statuses: function (req, res) {
    
    // Send a JSON response
    return res.view({
      data: {results: ['world']}
    });
  },


  /**
   * Action blueprints:
   *    `/admin/users`
   */
   users: function (req, res) {
    
    // Send a JSON response
    return res.view({
        data: {results: ['world']}
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AdminController)
   */
  _config: {}

  
};
