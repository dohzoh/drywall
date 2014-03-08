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
                primaryKey: true
            }
            // active or inactive flag
            , isActive: {
                type: "boolean"
            }
            // user name and login id
            , name: {
                type: 'alphanumericdashed',
                required: true
            }
            // user password
            , password: {
                type: 'string'
                , minLength: 6
            }
            // user email
            // not unique column
            // registered email
            , email: {
                type: 'email' // Email type will get validated by the ORM
                , required: true
            }
            // .....
            , email_authed: {
                type: "boolean"
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
            self._getUserId(values);
            // create hashed password
            self._getPassWord(values);
            // putItem database
            self.duplicated(values.name, next);
        }

        /**
         * create user_id
         * @param values    model attributes
         * @returns {string}
         * @private
         */
        , _getUserId: function(values){
            return values.user_id = require("crypto").createHash("sha1").update(values.name).digest("hex").substr(0,8);
        }
        // get encrypted password
        /**
         * createa password
         * @param values    model attributes
         * @returns {*}
         * @private
         */
        , _getPassWord: function(values){
            return values.password = require("bcrypt").hashSync(values.password, 10);
        }
        /**
         * check dupulicated user
         * @param name  user name
         * @param next  callback
         */
        , duplicated: function(name, next){
//            console.log(name);
            var user_id  = self._getUserId({name:name});
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
