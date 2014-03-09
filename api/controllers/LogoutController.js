/**
 * LogoutController
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
   *    `/logout/index`
   *    `/logout`
   */
   index: function (req, res) {
      console.log("start logout");
      req.session.authenticated = undefined;
      req.session.user_id = undefined;
      req.session.user_info = undefined;

    // Send a JSON response
    res.redirect('/', 302);
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to LogoutController)
   */
  _config: {}

  
};
