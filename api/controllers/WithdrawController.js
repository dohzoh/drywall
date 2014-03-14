/**
 * WithdrawController
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
(function () {
    "use strict";

    var self = {

        index: function(req, res){
            var user_id = req.session.user_id;
            if(require("lodash").isEmpty(user_id)) throw new Error("User Not Found");

            //sails.log(user_id);
            if (req.method !== 'POST') {
                // Send a Default View
                return res.view();
            }
            else {
                require("async").waterfall(self.indexWaterfall(req, res, user_id), function (error, results) {
                    if (error) sail.log.warn(error);
                    else return res.view("withdraw/success");
                });

            }

        }

        , indexWaterfall: function (req, res, user_id) {
            return [
                // get user
                function (callback) {
                    User.findOne({ user_id: user_id }, function (error, userInfo) {
                        try{
                            if (require("lodash").isEmpty(userInfo)) throw new Error("User Not Found, Id:", user_id);
                        } catch (e) {
                            error = e;
                            callback(error);
                        }
                        if (!error) callback(null, userInfo);
                    });

                }
                // put item
                , function (userInfo, callback) {
//                    sails.log(userInfo);
                    var params = {
                        user_id: userInfo.user_id
                        , name: userInfo.name
                        , email: userInfo.email
                    };
                    Zz_deleted_user.create(params, function (error, deleteInfo) {
                        try {
                            sails.log(deleteInfo);
                            if (require("lodash").isEmpty(deleteInfo)) throw new Error("User Add Error, Id:", user_id);
                        } catch (e) {
                            error = e;
                            callback(error);
                        }
                        if (!error) callback(null, userInfo);
                    });

                }
                // delete item
                , function (userInfo, callback) {
                    userInfo.destroy(function (err) {
                        console.log('User with ID ' + userInfo.user_id + ' was destroyed');
                          callback(null);
                    });
                }
            ];
        }


        /**
         * Overrides for the settings in `config/controllers.js`
         * (specific to WithdrawController)
         */
        , _config: {}
    };

    module.exports = self;
})();
