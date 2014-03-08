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
        schema: true,   // schema less mode

        attributes: {

            /* e.g.
             nickname: 'string'
             */
            // primary key user id
            user_id:{
                primaryKey: true
            }

            , isActive: {
                type: "boolean"
            }
            // user name
            , name: {
                type: 'alphanumericdashed',
                required: true
            }
            // user password
            , password: {
                type: 'string'
                , minLength: 6
//            , required: true
//            , columnName: 'encrypted_password'
            }
            // registered email
            , email: {
                type: 'email' // Email type will get validated by the ORM
                , required: true
            }

            , email_authed: {
                type: "boolean"
            }
        }

        // Lifecycle Callbacks
        , beforeCreate: function(values, next) {
            console.log("load before create");

            // set user id
            self._getUserId(values);
            self._getPassWord(values);
            //
            self.duplicated(values.name, next);
        }

        // custom method
        // get hashed userid
        , _getUserId: function(values){
            return values.user_id = require("crypto").createHash("sha1").update(values.name).digest("hex").substr(0,8);
        }
        // get encrypted password
        , _getPassWord: function(values){
            return values.password = require("bcrypt").hashSync(values.password, 10);
        }
        // check duplicated user
        , duplicated: function(name, next){
            console.log(name);
            var user_id  = self._getUserId({name:name});
            User.findOne({ user_id: user_id }, function(err, user) {
                // Do stuff here
                if(!err){
                    console.log("registered user",user);
                    if(_.isObject(user)){// require("underscore").isObject(user);
                        console.warn("Registered User Name:", name);
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
                    console.log(err);
                    next(err);
                }
            });
        }

    };

    module.exports = self;
})();
