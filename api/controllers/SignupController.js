/**
 * SignupController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"
        
        , viewContainer: {
            layout: "layoutGuest"
            , cache : false 
            , username: ""
            , email: ""
            , password: ""
            , confirm: ""
            , error: false
            , errors: {
                name: []
                , email: []
                , password: []
                , confirm: []
            }
        }

        /**
         * `SignupController.index`
         */
        , index: function (req, res) {
            var container = self.viewContainer;

            // GET 
            if (req.method !== 'POST') {
                console.log(container);
                return res.view(container);
            }
            // POST
            else {
                var body = req.params.all();
                container.username = body.username;
                container.email = body.email;
                container.password = body.password;
                container.confirm = body.confirm;
                console.log("container", container);
                // Send a Default View
                require("async").waterfall(self._signupWaterfall(req, res, container), function (error, results) {
                    if (error) {
                    	container.error = error;
                    	for(var key in error){
                    	    if(require("lodash").isArray(error[key]))
                    	       container.errors[key] = error[key];
                    	}
                    	
                        sails.log.warn("signup failed", error);
                        return res.view(container);
                    }
                    else {
                        return res.view("signup/confirm", {
                            layout: self.layout
                        });
                    }


                });


//                return self._createUser(req, res);
            }
        }


        /**
         * create user
         * @param req   request object
         * @param res   response object
         * @private
         * @see /models/User.js
         */
        , _signupWaterfall: function (req, res, container) {
            return [
            // null check
                function(callback){
                	User.validate({
                    	name: container.username
                    	, email: container.email
                    	, password: container.password
                    }, function(error){
/*                    	
error.ValidationError { name: 
   [ { rule: 'required',
       message: 'Validation error: "null" Rule "required(true)" failed.' } ],
  password: 
   [ { rule: 'minLength',
       message: 'Validation error: "123" Rule "minLength(6)" failed.' } ],
  email: 
   [ { rule: 'email',
       message: 'Validation error: "email" is not of type "email"' } ] }
*/
                        if( error ){
                            if ("ValidationError" in error) 
                                error = error.ValidationError;
                        }
                        
                        if (require("lodash").isEmpty(container.confirm)) { 
                            require("lodash").merge(error,{confirm:[ { rule: 'required', message: 'confirm required' } ] });
                        }; 
                        if (! require("lodash").isEqual(container.password, container.confirm)) { 
                            require("lodash").merge(error,{confirm:[ { rule: 'match', message: 'Don\'t Match confirm password' } ] });
                        }
       
                        if( error )callback(error);
                        else callback();
                        
                    });
                	
                }
			// create user
                , function(callback){
                    User.create({
                    	name: container.username
                    	, email: container.email
                    	, password: container.password
                    }, function (error, userInfo) {
                        if(error){
                            if ("ValidationError" in error) 
                                callback(error.ValidationError);
                            else
                                callback(error);
                        }
                        else callback(null, userInfo);
                    });
                }
                // send email
                , function(userInfo, callback){
		            var emailInfo = {
		                name: userInfo.name
		                , email: userInfo.email
		                , url: User.getTokenUrl(userInfo.user_id, userInfo.activationToken)
		            };
		            res.render('activate_txt', emailInfo, function(err, body){
		                if(err) sails.log.debug(err);
		                // Send a JSON response
		                else {
		                    emailInfo.text = body;
		                    nodemailer.send(emailInfo, function(err, response){
		                        if(err){
		                            sails.log.warn('send mail error', err);
		                            callback(err);
		                        }
		                        else{
		                            sails.log.debug('nodemailer sent', response);
		                            callback();
		                        }
		                    });
		                }
		
		            });
                }
            ];
        }

        , _signupNullCheck: function (req, res, container, callback) {
        }


        , _createUser: function (req, res) {
            User.create({
                // add user parameter
                name: req.body.username
                    , email: req.body.email
                    , password: req.body.password
                    , encrypted_password: req.body.password
                //                    , isDeleted: false
            }
                , function (error, userInfo) {
                    if (error) {
                        if ("ValidationError" in error) {
                            console.log(error.ValidationError.name);
                            console.log(error.ValidationError.email);
                            console.log(error.ValidationError.password);
                        }


                        console.warn("user create failed", error);
                        return res.view();
                    }
                    else {
                        sails.log.debug("create success", userInfo);
                        self._sendEmail(req, res, userInfo, function (err) {
                            if (!err) {
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

        , _sendEmail: function (req, res, userInfo, cb) {
            var emailInfo = {
                name: userInfo.name
                , email: userInfo.email
                , url: User.getTokenUrl(userInfo.user_id, userInfo.activationToken)
            }
            res.render('activate_txt', emailInfo, function (err, body) {
                if (err) sails.log.debug(err);
                    // Send a JSON response
                else {
                    emailInfo.text = body;
                    nodemailer.send(emailInfo, function (err, response) {
                        if (err) {
                            sails.log.warn('send mail error', err);
                            cb(err);
                        }
                        else {
                            sails.log.debug('nodemailer sent', response);
                            cb();
                        }
                    });
                }

            });
        }

        , _setSession: function (req, res, user) {
            req.session.user_id = user.user_id;
            delete user.password;
            req.session.user_info = user;
        }
        , _setSessionActivated: function (req, res, user) {
            req.session.authenticated = true;
        }

        , _updateUser: function (req, res, userInfo, cb) {
            User.update({
                user_id: userInfo.user_id
            }, {
                activated: true
            }, function (err, user) {
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
         * `SignupController.social`
         */

        , social: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }
        /**
         * `SignupController.activate`
         */

        , activate: function (req, res) {
            return res.view("signup/success", {
                layout: self.layout
            });
            return res.view("signup/failed", {
                layout: self.layout
            });
        }

    };

    module.exports = self;

})();
