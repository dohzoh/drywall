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
(function(){
    "use strict";
    var _ = require("underscore");
    var self = {
        /**
         * Action blueprints:
         *    `/signup/index`
         *    `/signup`
         */
        index: function (req, res) {
            //console.log("req.body", req.body);
            if(req.method !== 'POST')
                return res.view();
            else
                return self._createUser(req, res);
        }

        /**
         * create user
         * @param req   request object
         * @param res   response object
         * @private
         * @see /models/User.js
         */
        , _createUser : function(req, res){
            User.create({
                // add user parameter
                    name: req.body.username
                    , email: req.body.email
                    , password: req.body.password
                    , encrypted_password: req.body.password
                    , isActive: true
                }
                , function(error, results){
                    if(error) {
                        if("ValidationError" in error){
                            console.log(error.ValidationError.name);
                            console.log(error.ValidationError.email);
                            console.log(error.ValidationError.password);
                        }

                        var holds = {
                            username: req.body.username
                            , email:req.body.email
                            , error: [
                                'name'
                            ]
                            , errfor: {
                                name: 'required'
                            }
                            , success: false
                        }

                        console.warn("user create failed", error);
                        return res.json(holds);
                    }
                    else{
                        console.log("create success", results);
                        req.session.authenticated = true;
                        req.session.user_id = results.user_id;
                        delete results.password;
                        req.session.user_info = results;

                        return res.json({"success": true});
                    }
                }
            );
        }

        /**
         * Overrides for the settings in `config/controllers.js`
         * (specific to SignupController)
         */
        , _config: {}
    };


    module.exports = self;
})();

