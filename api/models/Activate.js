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

            , expire: {
                type: 'string'
            }
        }

    };
    module.exports = self;

})();
