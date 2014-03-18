/**
 * Social
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
(function(){
    "use strict"

    var self = {
        attributes: {
            // OAuth Service uid
            oauth_uid:{
                primaryKey: true    // primary hash key(default id)
            }
            // OAuth Service name   (e.g: twitter, facebook, google, )
            , oauth_provider:{
                primaryKey: true    // primary range key(default id)
            }
            // user_id
            , user_id:{
                type: 'string'
                , index: true
            }
        }

    };
    module.exports = self;

})();


