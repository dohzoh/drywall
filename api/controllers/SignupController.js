/**
 * SignupController
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
   *    `/signup/index`
   *    `/signup`
   */
    index: function (req, res) {
//console.log("req.body", req.body);
        if(req.method !== 'POST'){
            return res.view();
        }
        else{
            return res.json({"success": true});
        }
    },


  /**
   * Action blueprints:
   *    `/signup/add`
   */
   add: function (req, res) {
//console.log("req.method", req.method);
//console.log("req.body", req.body);
//res.send({redirect: '/'});

  res.writeHead(302, {
      'Location': '/'
  });
  res.end();
//res.redirect("/");
    // Send a JSON response
//    return res.view(req.body);
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SignupController)
   */
  _config: {}

  
};
