/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
            // user name and login id
            name: {
                type: 'string'
                , required: true
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
            // send message
            , message:{
                type: 'string'
            }
	}

};
