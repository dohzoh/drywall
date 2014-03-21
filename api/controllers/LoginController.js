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
                        require("lodash").merge(error,{password:[ { rule: 'required', message: 'password required' } ] });
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
                var params = req.params.all();
                container.username = params.username;
                container.email = params.email;
                
                require("async").waterfall(
                    self._forgotWaterfall(req, res, container)
                    , function (error, userInfo) {
                        // result now equals 'done'    
                        if (error) {
                            for(var key in error){
                                if(require("lodash").isArray(error[key]))
                                   container.errors[key] = error[key];
                            }
                            return res.view(self.layout,container);
                        }
                        //                        return res.json({ "success": false });
                        else{
                            container.partials.body = "login/forgot/confirm";
                            return res.view(self.layout, container);
                        }
                    }
                );
            }
        }
        
        , _forgotWaterfall: function (req, res, container) {
            return [
                // check require
                function (callback) {
                    sails.log("start require check");
                    var error = {};
                    if (require("lodash").isEmpty(container.username)) { 
                        require("lodash").merge(error,{name:[ { rule: 'required', message: 'username required' } ] });
                    }; 
                    if (require("lodash").isEmpty(container.email)) { 
                        require("lodash").merge(error,{email:[ { rule: 'required', message: 'email required' } ] });
                    }; 
                    
                    if(! require("lodash").isEmpty(error))callback(error);
                    else callback();
                }
                
                // check database
                , function (callback) {
                    sails.log("start data check");
                    User.findOne({ name: container.username }, function (error, userInfo) {
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
                            if (! require("lodash").isEqual(container.email, userInfo.email)) { 
                                require("lodash").merge(error,{name:[ { rule: 'match', message: 'invalid email' } ] });
                                throw new Error();
                            }
                                //                            if (parseInt(userInfo.isDeleted))  throw new Error ("inValid email");
                        } catch (e) {
                            callback(error);
                        }
                        if (require("lodash").isEmpty(error)) callback(null, userInfo);
                    });
                    
                }
                
                
                
                
                // add activate key
                , function (userInfo, callback) {
                    sails.log("start add activate key");
                    var data = {
                        user_id: userInfo.user_id
                        , email: userInfo.email
                        , type: "login/forgot"
                    }

                    Activate.create(data, function (error, activateInfo) {
                        try {
                            if (require("lodash").isEmpty(activateInfo)) throw new Error("create key error");
                        } catch (e) {
                            var error = e;
                            callback(error);
                        }
                        if (!error) callback(null, userInfo, activateInfo);
                    });
                }

                // send emai
                , function (userInfo, activateInfo, callback) {
                    sails.log("start send mail");
                    var emailInfo = {
                        url: Activate.getTokenUrl(activateInfo.id)
                    }
                    res.render('login_forget_txt', emailInfo, function (err, body) {
                        if (err) sails.log.debug(err);
                            // Send a JSON response
                        else {
                            emailInfo.to = userInfo.email;
                            emailInfo.text = body;
                            nodemailer.send(emailInfo, function (error, response) {
                                try {
                                    if (error) throw error;
                                } catch (e) {
                                    var error = e;
                                    callback(error);
                                }
                                if (!error) callback(null);
                            });
                        }

                    });
                    
                }
            ]
        }
        

        /**
         * `LoginController.rest`
         */

        , reset: function (req, res) {
            var container = viewContainer.factory(req);    // @see api/services/viewContainer.js

            var params = req.params.all();
            container.token = params.token;

            if (require("lodash").isEmpty(container.token)) res.redirect("/", 302);

            if (req.method !== 'POST') {
                return res.view(self.layout,container);
            }

            else {
                container.username = params.username;
                container.password = params.password;
                container.confirm = params.confirm;

                require("async").waterfall(
                    self._resetWaterfall(req, res, container)
                    , function (error, results) {
                        // result now equals 'done'    
                        if (error) {
                            for(var key in error){
                                if(require("lodash").isArray(error[key]))
                                   container.errors[key] = error[key];
                            }
                            sails.log.warn(error);
                            return res.view(self.layout,container);
                        }
                        else{
                            container.partials.body = "login/reset/success";
                            return res.view(self.layout, container);
                        }
                    }
                );
                
            }
            
            
        }
        
        , _resetWaterfall: function (req, res, container) {
            return [
                // check token
                function (callback) {
                sails.log("start token check");
                    Activate.findOne({ id: container.token }, function (error, activateInfo) {
                        try{
                            if (error) throw error;
                            if(require("lodash").isEmpty(activateInfo)){
                                sails.log.warn("Access From Unknown Token:", container.token);
                                res.redirect("/", 302);
                                throw new Error();
                            }
                        }catch(e){
                            error = e;
                            callback(error);
                        }

                        if (!error) callback(null, activateInfo);
                    });

                }
                
                // check require
                , function (activateInfo, callback) {
                    sails.log("start require check");
                    User.validate({
                        name: container.username
                        , password: container.password
                    }, function(error){
                        if( error ){
                        // must error
                            if ("ValidationError" in error) {
                                error = error.ValidationError;
                                error = require("lodash").omit(error, "email"); // don't need email validation

                                if (! require("lodash").isEqual(activateInfo.user_id, User.getUserId(container.username))) { 
                                    if(! require("lodash").has(error, 'name'))error.name = [];
                                    error.name.push({rule: 'match', message: 'Don\'t Match registered username' });
                                }
                                if (require("lodash").isEmpty(container.confirm)) { 
                                    error.confirm = [ { rule: 'required', message: 'confirm required' } ];
                                }; 

                                if (! require("lodash").isEqual(container.password, container.confirm)) { 
                                    if(! require("lodash").has(error, 'confirm'))error.confirm = [];
                                    error.confirm.push({ rule: 'match', message: 'Don\'t Match confirm password' });
                                }
                            
                                if(! require("lodash").isEmpty(error))callback(error);
                                else callback(null, activateInfo);
                            }
                        }
                    });
                }
                
                // get user 
                , function (activateInfo, callback) {
                    sails.log.debug("start update");
                    User.update({ user_id: activateInfo.user_id}
                    , { password: User.getPassWord(container.password)}
                    , function (error, userInfo) {
//                            sails.log.debug(userInfo);
                        try {
                            if (error) throw error;
                        } catch (e) {
                            error = e;
                            sails.log.debug("Error update:",error);
                             callback(error);
                        }

                        if (!error) callback(null, userInfo);
                    });
                }
            ];
        }
        
    };

    module.exports = self;

})();

