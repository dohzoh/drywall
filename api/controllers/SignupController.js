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
         *
         * @param req
         * @param res
         */
        , social: function (req, res) {
            return res.view();
        }

        /**
         * Action blueprints:
         *    `/signup/index`
         *    `/signup`
         * @param req
         * @param res
         * @returns {*}
         * @see /config/routes.js
         */
        , activate: function(req, res){
            var params = req.params.all();
            // see routes.js
            var user_id = params.id;
            var token = params.token;

            sails.log.debug('activation action', params);

            //Activate the user that was requested.
            User.findOne({
                    user_id: user_id
                }, function(error, userInfo){
                    if(error) {
                        sails.log.warn("User.findOne error:", error);
                        return res.view("signup/failed");
                    }
                    else{
                        // data not found
                        if(! require("underscore").isObject(userInfo)){
                            sails.log.warn("User Not Found, user_id:", user_id);
                            return res.view("signup/failed");
                        }
                        // activated
                        if(userInfo.activate){
                            sails.log.warn("was Activated, user_id:", user_id);
                            res.redirect("/login", 302);
                            return res.view("signup/failed");
                        }
                        // not same authtoken
                        if(token !== userInfo.activationToken){
                            sails.log.warn("Activation Failed, token:", token);

                        }

                        // we now have a model with instance methods attached
                        // update an attribute value
                        userInfo.activated = true

                        // save the updated value
                        userInfo.save(function(err) {
                            // value has been saved
                            if(!err){
                                self._setSessionActivated(req, res);
                                return res.view("signup/success");
                            }
                            return res.view("signup/failed");
                        });

/*
                        self._updateUser(req, res, userInfo, function(err){
                            if(!err)
                                return res.view("signup/success");
                            return res.view("signup/failed");
                        })
*/
//                        return res.view("signup/success");
                    }
            });


/*
*/
//            return res.json({success:"success"});
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
//                    , isDeleted: false
                }
                , function(error, userInfo){
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
                        return res.view();
                    }
                    else{
                        sails.log.debug("create success", userInfo);
                        self._sendEmail(req, res, userInfo, function(err){
                            if(!err){
                                sails.log.debug("set session");
                                self._setSession(req, res, userInfo);
                                return res.view("signup/confirm");
                            }
                            return res.view("signup/failed");
                        });
                    }
                }
            );
        }

        , _sendEmail: function(req, res, userInfo, cb) {
            var emailInfo = {
                name: userInfo.name
                , email: userInfo.email
                , url: User.getTokenUrl(userInfo.user_id, userInfo.activationToken)
            }
            res.render('activate_txt', emailInfo, function(err, body){
                if(err) sails.log.debug(err);
                // Send a JSON response
                else {
                    emailInfo.text = body;
                    nodemailer.send(emailInfo, function(err, response){
                        if(err){
                            sails.log.warn('send mail error', err);
                            cb(err);
                        }
                        else{
                            sails.log.debug('nodemailer sent', response);
                            cb();
                        }
                    });
                }

            });
        }

        , _setSession: function(req, res, user){
            req.session.user_id = user.user_id;
            delete user.password;
            req.session.user_info = user;
        }
        , _setSessionActivated: function(req, res, user){
            req.session.authenticated = true;
        }

        , _updateUser : function(req, res, userInfo, cb){
            User.update({
                user_id: userInfo.user_id
            },{
                activated: true
            }, function(err, user) {
                // Error handling
                if (err) {
                    sails.log.warn("Data Update Failed", err);
                    cb(err);
                    // Updated users successfully!
                } else {
                    sails.log.debug("User activated:", user);
                    self._setSessionActivated(req, res);
                    cb();
                }
            });
        }

        /**
         * Overrides for the settings in `config/controllers.js`
         * (specific to SignupController)
         */
        , _config: {}
    };


    module.exports = self;
})();

