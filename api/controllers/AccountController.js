/**
 * AccountController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";
    
    var self = {
        layout: "layoutMember"

        /**
         * `AccountController.index`
         */
        , index: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            
            return res.view(self.layout,container);
        }

        /**
         * `AccountController.password`
         */
        , password: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            
            // GET 
            if (req.method !== 'POST') {
                return res.view(self.layout, container);
            }
            // POST
            else {
                var params = req.params.all();
                container.user_id = req.session.user_id;
                container.password = params.password;
                container.confirm = params.confirm;
                
                require("async").waterfall(
                    waterfalls.password(req, res, container)
                    , function (error, results) {
                        // result now equals 'done'    
                        if (error) {
                            utilities.pickupErrors(container, error)
                            return res.view(self.layout,container);
                        }
                        else{
                            res.redirect("/account/settings", 302);
                        }
                    }
                );
            }            
        }
        
        /**
         * `AccountController.email`
         */
        , email: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            
            // GET 
            if (req.method !== 'POST') {
                return res.view(self.layout, container);
            }
            // POST
            else {
                var params = req.params.all();
                container.user_id = req.session.user_id;
                container.email = params.email;
                
                require("async").waterfall(
                    waterfalls.email(req, res, container)
                    , function (error, userInfo) {
                        // result now equals 'done'    
                        if (error) {
                            utilities.pickupErrors(container, error)
                            return res.view(self.layout,container);
                        }
                        else{
                            req.session.userInfo = userInfo;
                            res.redirect("/account/settings", 302);
                        }
                    }
                );
            }            
        }
        /**
         * `AccountController.settings`
         */
        , settings: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            User.findOne({user_id: req.session.user_id}, function(error, userInfo){
                if(error) req.send("500", 500);
                else {
                    container.userInfo = userInfo;

                    return res.view(self.layout,container);
                }
            });
        }
        /**
         * `AccountController.verification`
         */

        , verification: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            return res.view(self.layout,container);
        }
    };
    
    var waterfalls = {
        password: function(req, res, container){
            return [
                // validation
                function(callback){ methods.password.validate(container, callback); }
                // get userinfo
                , function(callback){ methods.common.getUser(container, callback); }
                // update data
                , function(userInfo, callback){ methods.password.updateUser(userInfo, container, callback); }
            ];
        }
        , email: function(req, res, container){
            return [
                // validation
                function(callback){ methods.email.validate(container, callback); }
                // get userinfo
                , function(callback){ methods.common.getUser(container, callback); }
                // update data
                , function(userInfo, callback){ methods.email.updateUser(userInfo, container, callback); }
            ];
        }
    };
    
    var methods = {
        common: {
            /**
             * get userinfo
             * @param {type} container
             * @param {type} callback
             * @returns {undefined}
             */
            getUser: function(container, callback){
                User.findOne({user_id: container.user_id}, function(error, userInfo){
                    if(error){callback(error);}
                    else{
                        // ok
                        callback(null, userInfo);
                    };
                });
            }
            
        }
        , password:{
            /**
             * password validation on profile setting
             * @param {object} container  viewContainer
             * @param {function} callback 
             * @returns {undefined}
             */
            validate: function(container, callback){
                User.validate({
                    password: container.password
                }, function(error){
                // must error
                    if ("ValidationError" in error) {
                        error = error.ValidationError;
                        error = require("lodash").omit(error, "name"); // don't need email validation
                        error = require("lodash").omit(error, "email"); // don't need email validation

                        if (require("lodash").isEmpty(container.confirm)) { 
                            error.confirm = [ { rule: 'required', message: 'confirm required' } ];
                        }; 

                        if (! require("lodash").isEqual(container.password, container.confirm)) { 
                            if(! require("lodash").has(error, 'confirm'))error.confirm = [];
                            error.confirm.push({ rule: 'match', message: 'Don\'t Match confirm password' });
                        }

                        if(! require("lodash").isEmpty(error))callback(error);
                        else callback(null);
                    }

                });
            }
            /**
             * update password
             * @param {type} userInfo
             * @param {type} container
             * @param {type} callback
             * @returns {undefined}
             */
            , updateUser: function(userInfo, container, callback){
                userInfo.password = User.getPassWord(container.password);
                userInfo.save( function(error, userInfo){
                    if(error) callback(error);
                    else callback(null, userInfo);
                });
            }
            
        }
        
        , email:{
            /**
             * email validation on profile setting
             * @param {object} container  viewContainer
             * @param {function} callback 
             * @returns {undefined}
             */
            validate: function(container, callback){
                User.validate({
                    email: container.email
                }, function(error){
                // must error
                    if ("ValidationError" in error) {
                        error = error.ValidationError;
                        error = require("lodash").omit(error, "name"); // don't need name validation
                        error = require("lodash").omit(error, "password"); // don't need passowrd validation

                        if(! require("lodash").isEmpty(error))callback(error);
                        else callback(null);
                    }
                });
            }
            /**
             * update email
             * @param {type} userInfo
             * @param {type} container
             * @param {type} callback
             * @returns {undefined}
             */
            , updateUser: function(userInfo, container, callback){
                userInfo.email = container.email;
                userInfo.save( function(error, userInfo){
                    if(error) callback(error);
                    else callback(null, userInfo);
                });
            }
            
        }
        
        
        
        
        
                // validation
        
    }
    
    module.exports = self;

})();
