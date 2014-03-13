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
            type:{
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
//        , beforeCreate: function (values, next) {
//            next();
//        }

        /**
         * get activate token
          * @param email    email address
         * @returns {*}
         */
        , getTokenUrl: function (id) {
            return "http://localhost:1337/login/reset/"+ id + "/"
        }
    };
    module.exports = self;

})();
