/**
 * Activate
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
(function(){
    "use strict"

    var self = {
        attributes: {
            token:{
                primaryKey: true    // primary key(default id)
            }

            , type:{
                type: 'string'
            }

            , user_id:{
                type: 'string'
            }

            , email: {
                type: 'string'
            }

            , expire: {
                type: 'string'
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
        , beforeCreate: function (values, next) {
            console.log("load before create");

            // set activation token
            values.token = self.getActivetionToken(values.email);
        }

        /**
         * get activate token
          * @param email    email address
         * @returns {*}
         */
        , getActivetionToken: function (email) {
            sails.log.debug("getActivetionToken: ", email);
            return require("crypto").createHash("sha1").update((new Date().getTime() + email)).digest("hex");
        }
        , getTokenUrl: function (user_id, token) {
            return "http://localhost:1337/login/reset/" + user_id + "/" + token + "/"
        }
    };
    module.exports = self;

})();
