/**
 * LoginController
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
var passport = require('passport');

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/login/index`
   *    `/login`
   */
    index: function (req, res) {

        if(req.method !== 'POST'){
            // Send a Default View
            return res.view();
        }
        else{
            // Send a JSON Response
            return res.json({"success": true});
        }

    },


  /**
   * Action blueprints:
   *    `/login/forgot`
   */
   forgot: function (req, res) {
    
    // Send a JSON response
    return res.view({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/login/reset`
   */
   reset: function (req, res) {
    
    // Send a JSON response
    return res.view({
      hello: 'world'
    });
  }


    , _process: function(req, res, cb)
    {
        passport.authenticate('local', function(err, user, info)
        {
            if ((err) || (!user))
            {
                res.redirect('/login');
                return;
            }

            req.logIn(user, function(err)
            {
                if (err)
                {
                    res.view();
                    return;
                }

                res.redirect('/');
                return;
            });
        })(req, res);
    }



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to LoginController)
   */
  , _config: {}

  
};
