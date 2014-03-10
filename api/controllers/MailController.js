/**
 * MailController
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
     * Overrides for the settings in `config/controllers.js`
     * (specific to MailController)
     */
    _config: {}

  
  /**
   * Action blueprints:
   *    `/mail/index`
   *    `/mail`
   */
   , index: function (req, res) {
        res.render('activate_txt', function(err, body){
            if(err) console.log(err);
            // Send a JSON response
            else {
                nodemailer.send({
                    text: body
                }, function(err, response){
                    if(err) console.log(err);
                    else{
                        sails.log.debug('nodemailer sent', err, response);
                        return res.json( {success: true} );
                    }
                });
            }

        });

/*
*/
    }





  
};
