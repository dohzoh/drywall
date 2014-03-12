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
(function(){
    'use strict';

    var self = {
        /**
         * Action blueprints:
         *    `/login/index`
         *    `/login`
         */
        index: function (req, res) {

            if ( typeof req.session !== 'undefined' && req.session.authenticated) {
                console.log('authentication success');
                res.redirect("/account/", 302);
                return;
            }

            if(req.method !== 'POST'){
                // Send a Default View
                return res.view();
            }
            else{
//                console.log(User);

//                console.log("User.tempMethod():", User.tempMethod());
                var user_id = User.getUserId(req.body.username);
                var password = req.body.password;

//                console.log("body:", req.body);
//                console.log("::user_id:", user_id);
//                console.log("::password:", password);


                User.findOne({
                    user_id: user_id
                }, function(error, results){
                    if(!error) {
//                        console.log("found user", results);
                        if (require("lodash").isObject(results)) {
//                            console.log("isObject")
//                            var hash = User.comparePassWord(password, results.password);
//                            console.log("results.password === ", hash)
//                            console.log("results.password",results.password);
                            if(! results.activated){
                                sails.log.warn("not activate user", results.user_id);
                                return res.view();
                            }

                            if( User.comparePassWord(password, results.password)){
//                                console.log("is authed");
                                // set session
                                req.session.authenticated = true;
                                req.session.user_id = results.user_id;
                                delete results.password;
                                req.session.user_info = results;
                                res.redirect("/account/", 302);
//                                return res.json({"success": true});
                            }
                        }
//                        else
//                            console.log("nonObject");
                    }
                    else
                        console.warn("error found", error);
                    return res.view();
//                    return res.json({"success": false});
                });




//                req.session.authenticated = true;
                // Send a JSON Response
//                return res.json({"success": true});
            }

        },


        /**
         * Action blueprints:
         *    `/login/forgot`
         */
        forgot: function (req, res) {

            // Send a JSON response
            if(req.method !== 'POST'){
                // Send a Default View
                return res.view();
            }
            else {
                sails.log.debug("req.body", req.body);

                require("async").waterfall(
                    self._forgotWaterfall(req, res)
                    , function (err, result) {
                        // result now equals 'done'    
                        //                        if (err) { throw err; }
                        sails.log.debug(err);
                        return res.json({ "success": false });
                    }
                );
            }
        }

        , _forgotWaterfall: function (req, res) {
            return [
                // check require
                function (callback) {
                    var error = null;
                    try {
                        if (require("lodash").isEmpty(req.body.username)) throw new Error("required name");
                        if (require("lodash").isEmpty(req.body.email)) throw new Error("required email");
                    } catch (e) {
                        var error = e;
                    }
                    callback(error);
                }
                // check database
                , function (callback) {
                    User.findOne({ name: req.body.username }, function (error, userInfo) {
                        try {
                            if (require("lodash").isEmpty(userInfo)) throw new Error( "email not found");
                            if (! userInfo.activated) throw new Error("Not Activate User");
                            if (userInfo.isDeleted)  throw new Error ("inValid email");
                        } catch (e) {
                            var error = e;
                        }
                        callback(error, userInfo);
                    });
                }
                // add activate key
                , function (userInfo, callback) {
                    var data = {
                        user_id: userInfo.user_id
                        , email: userInfo.email
                        , type: "login/forgot"
                    }

                    Activate.create(data, function (error, activateInfo) {
                        try {
                            if (require("lodash").isEmpty(userInfo)) throw "email not found";
                        } catch (e) {
                            var error = e;
                        }
                        callback(error, userInfo, activateInfo);
                    });
                }

                // send emai
                , function (userInfo, activateInfo, callback) {
                    var emailInfo = {
                        name: userInfo.name
                        , email: userInfo.email
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
                // replay user
                , function (userInfo, callback) {
                    sails.log.debug("req.body", req.body);
                    // Send a JSON Response
                    return res.view("login/forgot");
                    callback(null);
                }
            ]
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

        /**
         * Action blueprints:
         *    `/login/reset`
         */
        , reset: function (req, res) {

            // Send a JSON response
            return res.view({
                hello: 'world'
            });
        }

        /*
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

         */

        /**
         * Overrides for the settings in `config/controllers.js`
         * (specific to LoginController)
         */
        , _config: {}


    };


    module.exports = self;

})();
