/**
 * LoginController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"
        
        /**
         * `LoginController.index`
         */
        , index: function (req, res) {
            var container = viewContainer.factory(req);    // @see api/services/viewContainer.js
        // logined user
            sails.log("req.session", req.session);
            if ( typeof req.session !== 'undefined' && req.session.authenticated) {
                console.log('authentication success');
                res.redirect("/account/", 302);
                return;
            }
            
            if (req.method !== 'POST') {
                // Send a Default View
                return res.view(self.layout,container);
            }

            else {
                var params = req.params.all();
                container.username = params.username;
                container.password = params.password;
                
                require("async").waterfall(
                    self._loginWaterfall(req, res, container)
                    , function (error, userInfo) {
                        // result now equals 'done'    
                        if (error) {
                            sails.log("container", container);
                            sails.log("login failed", error.message);
                            for(var key in error){
                                if(require("lodash").isArray(error[key]))
                                   container.errors[key] = error[key];
                            }
                            return res.view(self.layout,container);
                        }
                            //                        sails.log.debug(err);
                            //                        return res.json({ "success": false });
                        else {

                            sails.log("login success");
                            req.session.authenticated = true;
                            req.session.user_id = userInfo.user_id;
                            delete userInfo.password;
                            req.session.userInfo = userInfo;
                            res.redirect("/account/", 302);
//                            return res.view({ username: req.body.username });
                        }
                    }
                );
            }
        }
        
        /**
         * waterfall method of login flow 
         * @param {type} req
         * @param {type} res
         * @returns {Array}
         */
        , _loginWaterfall: function (req, res, container) {
            return [
                // null check
                function (callback) {
                    var error = {};
                    if (require("lodash").isEmpty(container.username)) { 
                        require("lodash").merge(error,{name:[ { rule: 'required', message: 'username required' } ] });
                    }; 
                    if (require("lodash").isEmpty(container.password)) { 
                        require("lodash").merge(error,{password:[ { rule: 'required', message: 'username required' } ] });
                    }; 
                    if(! require("lodash").isEmpty(error))callback(error);
                    else callback();
               }

                // validation parameters
                , function (callback) {
                    var user_id = User.getUserId(container.username);
                    var password = container.password;

                    User.findOne({ user_id: user_id }, function (error, userInfo) {
                        try {
                            if (error) throw error;
                            error = {};
                            if (require("lodash").isEmpty(userInfo)){ 
                                require("lodash").merge(error,{name:[ { rule: 'notfound', message: "user not found" } ] });
                                throw new Error();
                            }
                            if (! userInfo.activated){
                                require("lodash").merge(error,{name:[ { rule: 'notactivated', message: "Not Activate User" } ] });
                                throw new Error();
                            }
                            if (! User.comparePassWord(password, userInfo.password)){
                                require("lodash").merge(error,{name:[ { rule: 'invalidpassword', message: "invalid password"} ] });
                                throw new Error();
                            }
                                //                            if (parseInt(userInfo.isDeleted))  throw new Error ("inValid email");
                        } catch (e) {
                            callback(error);
                        }
                        if (require("lodash").isEmpty(error)) callback(null, userInfo);
                    });
                }
                // finish
                ,  function(userInfo, callback){
                    callback(null, userInfo);
                }

            ];
        }
        
        
        /**
         * `LoginController.forgot`
         */

        , forgot: function (req, res) {
            var container = viewContainer.factory(req);    // @see api/services/viewContainer.js

            if (req.method !== 'POST') {
                
                return res.view(self.layout,container);
            }

            else {
                container.partials.body = "login/forgot/confirm";
                return res.view(self.layout, container);
            }
        }

        /**
         * `LoginController.rest`
         */

        , reset: function (req, res) {
            var container = viewContainer.factory(req);    // @see api/services/viewContainer.js

            if (req.method !== 'POST') {
                return res.view(self.layout,container);
            }

            else {
                container.partials.body = "login/reset/success";
                return res.view(self.layout, container);
            }
        }
    };

    module.exports = self;

})();

