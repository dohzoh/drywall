/**
 * Z_user_deleted
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
(function () {
    "use strict"

    var self = {
        attributes: {
            user_id: {
                primaryKey: true    // primary hash key(default id)
            }
        // user name and login id
            , name: {
                type: 'alphanumericdashed',
                required: true
                , index: true   // global index
            }
        // user email
            , email: {
                type: 'email' // Email type will get validated by the ORM
                , required: true
                , index: true   // global index
            }
        }
    };
    module.exports = self;

})();
