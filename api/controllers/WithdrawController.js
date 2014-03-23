/**
 * WithdrawController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutMember"

        /**
         * `WithdrawController.index`
         */
        , index: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js

            if (req.method !== 'POST') {
                return res.view(self.layout, container);
            }

            else {
                container.partials.body = "withdraw/success";
                
                var params = req.params.all();
                var user_id = req.session.user_id;
                
                require("async").waterfall(self.indexWaterfall(req, res, user_id), function (error, results) {
                    if (error) sails.log.warn(error);
//                    else return res.view(self.layout, container);
                    else res.redirect("/logout/withdraw", 302);
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
        
    };

    module.exports = self;

})();
