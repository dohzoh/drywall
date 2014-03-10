/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
(function(){
    'use strict'

    var _ = require("underscore");
    var self = {
        // column list
        attributes: {
            // primary key user id
            // you must NOT use primarykey your have special reason.
            user_id:{
                primaryKey: true    // primary hash key(default id)
            }
            // active or inactive flag
            , isDeleted: {
                type: "boolean"
            }
            // user name and login id
            , name: {
                type: 'alphanumericdashed',
                required: true
                , index: true   // global index
            }
            // user password
            , password: {
                type: 'string'
                , minLength: 6
                , index: true   // global index
            }
            // user email
            // not unique column
            // registered email
            , email: {
                type: 'email' // Email type will get validated by the ORM
                , required: true
                , index: true   // global index
            }
            // email activate
            , activated: {
                type: 'boolean',
                defaultsTo: false
            }
            // activation token
            , activationToken: {
                type: 'string'
            }
            // social
            , isSocial:{
                type: "boolean"
            }
            // activation token
            , socialActivated: {
                type: "boolean"
            }
            /**
             * Strips the password out of the json
             * object before its returned from waterline.
             * @return {object} the model results in object form
             */
            , toJSON: function() {
                // this gives you an object with the current values
                var obj = this.toObject();
                delete obj.password;

                delete obj.activationToken;
                delete obj.activated;
                // return the new object without password
                return obj;
            }
        }

        /**
         * before putItem filter.
         *  crate hashed user_id, password
         *  data validation
         *  check duplicate user name
         * @param values
         * @param next
         */
        , beforeCreate: function(values, next) {
            console.log("load before create");

            // craete hashed user_id
            values.user_id = self.getUserId(values.name);
            // create hashed password
            values.password = self.getPassWord(values.password);
            // set activation token
            values.activated = false;
            values.activationToken = self.getActivetionToken(values.email);
            // putItem database
            self.duplicated(values.name, next);
        }

        /**
         * create user_id
         * @param name    model attributes
         * @returns {string}
         */
        , getUserId: function(name){
            return require("crypto").createHash("sha1").update(name).digest("hex").substr(0,8);
        }
        /**
         * get encrypted password
         * @param password    model attributes
         * @returns {*}
         * @private
         */
        , getPassWord: function(password){
            return require("bcrypt").hashSync(password, 10);
        }
        , comparePassWord: function(password, encrypted){
            return require("bcrypt").compareSync(password, encrypted);
        }
        /**
         * get activate token
          * @param email    email address
         * @returns {*}
         */
        , getActivetionToken: function(email){
            return require("crypto").createHash("sha1").update((new Date().getTime()+email)).digest("hex");
        }
        , getTokenUrl: function(user_id, token){
            return "http://localhost:1337/signup/activate/"+user_id+"/"+token+"/"
        }
        /**
         * check dupulicated user
         * @param name  user name
         * @param next  callback
         */
        , duplicated: function(name, next){
//            console.log(name);
            var user_id  = self.getUserId(name);
            User.findOne({ user_id: user_id }, function(err, user) {
                // Do stuff here
                if(!err){
//                    console.log("registered user",user);
                    if(_.isObject(user)){// require("underscore").isObject(user);
//                        console.warn("Registered User Name:", name);
                        // duplicate key existed
                        next({
                            message: 'The conditional request failed',
                            code: 'ConditionalCheckFailedException',
                            statusCode: 400
                        });
                    }
                    else{
                        next(null, user);
                    }
                }
                else{
//                    console.log(err);
                    next(err);
                }
            });
        }

    };

    module.exports = self;
})();
