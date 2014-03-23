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
// /media/sf_Shared/intellij/drywall/views/            
            partials: {
                body: "signup/index"
            }
            , error: false
            , errors: {}
        }

        /**
         * `SignupController.index`
         */
        , index: function (req, res) {
//            var container = require("lodash").cloneDeep(self.viewContainer) ;
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js

            // GET 
            if (req.method !== 'POST') {
                console.log(container);
                return res.view(self.layout, container);
            }
            // POST
            else {
                var params = req.params.all();
                container.username = params.username;
                container.email = params.email;
                container.password = params.password;
                container.confirm = params.confirm;
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
                        return res.view(self.layout, container);
                    }
                    else {
                        container.partials.body = "signup/confirm"
                        return res.view(self.layout, container);
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
                        else error = {};
                        
                        if (require("lodash").isEmpty(container.confirm)) { 
                            error.confirm = [ { rule: 'required', message: 'confirm required' } ];
                        }; 

                        if (! require("lodash").isEqual(container.password, container.confirm)) { 
                            if(! require("lodash").has(error, 'confirm'))error.confirm = [];
                            error.confirm.push({ rule: 'match', message: 'Don\'t Match confirm password' });
                        }
       
                        if (! require("lodash").isEmpty(error)) callback(error);
                        else callback();
                        
                    });
                	
                }
			// check user
                , function(callback){
                    User.findOne({name:container.username}, function(error, userInfo){
                        if(error){callback(error);}
                        else{
                            if(! require("lodash").isEmpty(userInfo)){
                                // exist user
                                callback({name:[ { rule: 'exists', message: 'Exists User' } ] });
                            }
                            else{
                                // ok
                                callback();
                            }
                        };
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


        /**
         * `SignupController.activate`
         */

        , activate: function (req, res) {
//            var container = require("lodash").cloneDeep(self.viewContainer) ;
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            
            var params = req.params.all();
            // see routes.js
            container.user_id = params.id;
            container.token = params.token;
            
            require("async").waterfall(self._activateWaterfall(req, res, container), function (error, results) {
                if (error) {
                    container.error = error;
                    for(var key in error){
                        if(require("lodash").isArray(error[key]))
                           container.errors[key] = error[key];
                    }
                    
                    sails.log.warn("signup failed", error);
                    container.partials.body = "signup/failed";
                    return res.view(self.layout, container);
                }
                else {
                    container.partials.body = "signup/success";
                    return res.view(self.layout, container);
                }
            });
            
        }

        
        , _activateWaterfall: function (req, res, container) {
            return[
            // user check
                function(callback){
                    User.findOne({
                        user_id: container.user_id
                    }, function(error, userInfo){
                        if(error){callback(error);}
                        else{
                            error = {};
                        // data not found                            
                            if(require("lodash").isEmpty(userInfo)){
                                // exist user
                                require("lodash").merge(error,{name:[ { rule: 'notexists', message: 'Not Exists User' } ]});
                            }
       
                        // activated
                            if(userInfo.activate){
                                sails.log.warn("was Activated, user_id:", container.user_id);
                                res.redirect("/login", 302);
                                require("lodash").merge(error,{name:[ { rule: 'activated', message: 'Is Active User' } ]});
                            }                            
                            
                         // not same authtoken
                            if (! require("lodash").isEqual(container.token,  userInfo.activationToken)) { 
                                sails.log.warn("Activation Failed, token:", container.token);
                                require("lodash").merge(error,{name:[ { rule: 'match', message: 'Don\'t Match Authenication Token' } ]});
                            }
                                
                            if(! require("lodash").isEmpty(error))callback(error);
                            else callback(null, userInfo);
                        }
                    });
                    
                }
            // data update
                , function(userInfo, callback){
                    // we now have a model with instance methods attached
                    // update an attribute value
                    userInfo.activated = true;

                    // save the updated value
                    userInfo.save(function(error, userInfo) {
                        // value has been saved
                        if( error )callback(error);
                        else{
                            req.session.user_id = userInfo.user_id;
                            delete userInfo.password;
                            req.session.userInfo = userInfo;
                            req.session.authenticated = true;
                            callback();
                        }
                    });                
                }
            ];
        }

        /**
         * `SignupController.social`
         */

        , social: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }

    };

    module.exports = self;

})();
